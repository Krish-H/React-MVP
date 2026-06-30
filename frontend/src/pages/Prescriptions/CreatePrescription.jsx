import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Card, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usePrescription } from '../../modules/prescription/hooks/usePrescription';
import { apiService } from '../../services/apiService';
import { useAuth } from '../../modules/auth/hooks/useAuth';

const { TextArea } = Input;


const CreatePrescription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form] = Form.useForm();

  const [patients, setPatients] = useState([]);
  
  const { createPrescription, submitting } = usePrescription();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await apiService.get('/patients');
      setPatients(res?.patients || res || []);
    } catch (err) {
      console.log('Patient load error', err);
    }
  };

  const onFinish = (values) => {
  const payload = {
    ...values,
    provider_id: user.id 
  };

  createPrescription(payload);
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