import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Card, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usePrescription } from '../../modules/prescription/hooks/usePrescription';
import { apiService } from '../../services/apiService';

const { TextArea } = Input;

const normalizeArray = (res, key) => {
  return (
    res?.[key] ||
    res?.data?.[key] ||
    res?.data ||
    res ||
    []
  );
};
const CreatePrescription = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [patients, setPatients] = useState([]);
  const [providers, setProviders] = useState([]);

  const { createPrescription, submitting } = usePrescription();

  useEffect(() => {
    loadPatients();
    loadProviders();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await apiService.get('/patients');
      setPatients(res?.patients || res || []);
    } catch (err) {
      console.log('Patient load error', err);
    }
  };

  // ✅ FIXED: /api/staff is ADMIN only → use /api/users instead
  // /api/users allows ADMIN + PROVIDER + NURSE roles
  const loadProviders = async () => {
    try {
      const res = await apiService.get('/users');
     const users = normalizeArray(res, 'users');
      console.log('USERS API RESPONSE:', users);

    const providers = users.filter(
      (u) => Number(u.role_id) === 2
    );

    setProviders(providers);
  } catch (err) {
    console.log('Provider load error', err);
  }
};

  const onFinish = (values) => {
    createPrescription(values);
    navigate('/prescriptions');
  };

  return (
    <DashboardLayout>
      <Card title="Create Prescription">
        <Form form={form} layout="vertical" onFinish={onFinish}>

          {/* Patient Dropdown */}
          <Form.Item
            name="patient_id"
            label="Patient"
            rules={[{ required: true, message: 'Please select a patient' }]}
          >
            <Select
              placeholder="Select Patient"
              showSearch
              optionFilterProp="children"
            >
              {patients.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Provider Dropdown — now fetched from /api/users */}
          <Form.Item
            name="provider_id"
            label="Provider"
            rules={[{ required: true, message: 'Please select a provider' }]}
          >
            <Select
              placeholder="Select Provider"
              showSearch
              optionFilterProp="children"
            >
              {providers.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Notes */}
          <Form.Item name="notes" label="Notes">
            <TextArea rows={3} />
          </Form.Item>

          {/* Medicine Items */}
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Card key={field.key} style={{ marginBottom: 10 }}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'medicine_name']}
                      label="Medicine Name"
                      rules={[{ required: true, message: 'Enter medicine name' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'dosage']}
                      label="Dosage"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'quantity']}
                      label="Quantity"
                    >
                      <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>

                    <Button danger onClick={() => remove(field.name)}>
                      Remove
                    </Button>
                  </Card>
                ))}

                <Button onClick={() => add()}>+ Add Medicine</Button>
              </>
            )}
          </Form.List>

          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            style={{ marginTop: 16 }}
          >
            Create Prescription
          </Button>

        </Form>
      </Card>
    </DashboardLayout>
  );
};

export default CreatePrescription;