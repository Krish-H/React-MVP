import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#666'};
  font-size: 13px;
  font-weight: 500;
  padding: 0;
  margin-bottom: 16px;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.colors?.primary?.main || '#000'}; }
  svg { font-size: 18px; }
`;

const PharmacyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        selectedPrescription,
        selectedLoading,
        fetchPrescription,

        addItem,
        updateItem,
        deleteItem,
        updateStatus,
        verifyPrescription,
        dispensePrescription,
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
            <div style={{ padding: '20px' }}>
                <BackBtn onClick={() => navigate('/pharmacy')}>
                    <ArrowBackIcon /> Back to Pharmacy
                </BackBtn>
                <Card
                title={`Prescription #${data.id}`}
                extra={
                    <Space>

                        {data.status === 'PENDING' && (
                            <Button type="primary" onClick={() => verifyPrescription(id)}>
                                Verify
                            </Button>
                        )}

                        {data.status === 'VERIFIED' && (
                            <Button type="primary" onClick={() => dispensePrescription(id)}>
                                Dispense
                            </Button>
                        )}

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
            </div>
        </DashboardLayout>
    );
};

export default PharmacyDetails;
