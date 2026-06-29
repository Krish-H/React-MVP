import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Table,
  Tag,
  Button,
  Spin,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Popconfirm,
} from 'antd';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { usePrescription } from '../../modules/prescription/hooks/usePrescription';

const PrescriptionDetails = () => {
  const { id } = useParams();

  const {
    selectedPrescription,
    selectedLoading,
    fetchPrescription,

    addItem,
    updateItem,
    deleteItem,
    updateStatus,
  } = usePrescription();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchPrescription(id);
  }, [id]);

  // ---------------- OPEN ADD ----------------
  const openAddModal = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // ---------------- OPEN EDIT ----------------
  const openEditModal = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (values) => {
    if (editingItem) {
      updateItem(id, editingItem.id, values);
    } else {
      addItem(id, values);
    }

    setIsModalOpen(false);
  };

  const columns = [
    { title: 'Medicine', dataIndex: 'medicine_name' },
    { title: 'Dosage', dataIndex: 'dosage' },
    { title: 'Quantity', dataIndex: 'quantity' },

    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditModal(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete this medicine?"
            onConfirm={() => deleteItem(id, record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (selectedLoading) {
    return (
      <DashboardLayout>
        <Spin />
      </DashboardLayout>
    );
  }

  const data = selectedPrescription || {};

  return (
    <DashboardLayout>
      <Card
        title={`Prescription #${data.id}`}
        extra={
          <Space>
            <Button
              onClick={() =>
                updateStatus(id, 'COMPLETED')
              }
            >
              Complete
            </Button>

            <Button
              danger
              onClick={() =>
                updateStatus(id, 'CANCELLED')
              }
            >
              Cancel
            </Button>

            <Button type="primary" onClick={openAddModal}>
              Add Medicine
            </Button>
          </Space>
        }
      >
        <p>
          <b>Status:</b> <Tag>{data.status}</Tag>
        </p>

        <p>
          <b>Notes:</b> {data.notes}
        </p>

        <Table
          dataSource={data.items || []}
          columns={columns}
          rowKey="id"
          pagination={false}
        />

        {/* ---------------- MODAL ---------------- */}
        <Modal
          title={editingItem ? 'Edit Medicine' : 'Add Medicine'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="medicine_name"
              label="Medicine Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="dosage" label="Dosage">
              <Input />
            </Form.Item>

            <Form.Item name="quantity" label="Quantity">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </DashboardLayout>
  );
};

export default PrescriptionDetails;