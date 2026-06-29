import React from 'react';
import { Form, Input, Button, InputNumber, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usePrescription } from '../../modules/prescription/hooks/usePrescription';

const { TextArea } = Input;

const CreatePrescription = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    createPrescription,
    submitting,
  } = usePrescription();

  const onFinish = (values) => {
    createPrescription(values);
    navigate('/prescriptions');
  };

  return (
    <DashboardLayout>
      <Card title="Create Prescription">

        <Form form={form} layout="vertical" onFinish={onFinish}>

          <Form.Item
            name="patient_id"
            label="Patient ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="provider_id"
            label="Provider ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <TextArea rows={3} />
          </Form.Item>

          {/* SIMPLE ITEMS (no fancy dynamic form yet) */}
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Card key={field.key} style={{ marginBottom: 10 }}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'medicine_name']}
                      label="Medicine Name"
                      rules={[{ required: true }]}
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
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Button danger onClick={() => remove(field.name)}>
                      Remove
                    </Button>
                  </Card>
                ))}

                <Button onClick={() => add()}>
                  Add Medicine
                </Button>
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