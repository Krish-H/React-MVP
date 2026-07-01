import React, { useEffect, useState } from 'react';
import { Table, Button, Spin, Alert, Card, Row, Col, Tag, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useBilling } from '../../modules/billing/hooks/useBilling';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { apiService } from '../../services/apiService';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const StatCard = styled(Card)`
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  .ant-card-body {
    padding: 20px;
  }
  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors?.neutral?.textSecondary || '#888'};
    font-size: 14px;
    text-transform: uppercase;
  }
  p {
    margin: 8px 0 0 0;
    font-size: 28px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors?.neutral?.textPrimary || '#333'};
  }
`;

const InvoicePage = () => {
  const { user } = useAuth();
  const isPatient = user?.role_id === 4;

  const {
    invoices,
    myInvoices,
    pendingSummary,
    paidSummary,
    listLoading,
    listError,
    fetchInvoices,
    fetchMyInvoices,
    fetchSummaries,
    createInvoice,
    updateStatus,
    submitting,
    submitSuccess,
    resetSubmit
  } = useBilling();

  const [patients, setPatients] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isPatient) {
      fetchMyInvoices();
    } else {
      fetchInvoices();
      fetchSummaries();
      loadPatients();
    }
  }, [fetchInvoices, fetchMyInvoices, fetchSummaries, isPatient]);

  useEffect(() => {
    if (submitSuccess) {
      message.success('Invoice generated successfully!');
      setIsCreateModalOpen(false);
      form.resetFields();
      resetSubmit();
    }
  }, [submitSuccess, form, resetSubmit]);

  const loadPatients = async () => {
    try {
      const res = await apiService.get('/patients');
      setPatients(res.patients || res.data || res);
    } catch (err) {
      console.log('Failed to load patients', err);
    }
  };

  const patientMap = Object.fromEntries(
    patients.map((p) => [p.id, p.name])
  );

  const handleCreateSubmit = (values) => {
    createInvoice(values);
  };

  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus);
  };

  const columns = [
    {
      title: 'Invoice #',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
    },
    {
      title: 'Patient',
      key: 'patient',
      render: (_, record) => patientMap[record.patient_id] || `Patient #${record.patient_id}`
    },
    {
      title: 'Amount ($)',
      dataIndex: 'amount',
      key: 'amount',
      render: (val) => parseFloat(val).toFixed(2)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => {
        if (isPatient) {
          return status === 'paid' ? <Tag color="green">Paid</Tag> : <Tag color="orange">Pending</Tag>;
        }
        return (
          <Select 
              value={status} 
              onChange={(val) => handleStatusChange(record.id, val)}
              style={{ width: 120 }}
              options={[
                  { value: 'pending', label: <Tag color="orange">Pending</Tag> },
                  { value: 'paid', label: <Tag color="green">Paid</Tag> }
              ]}
          />
        );
      }
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (val) => new Date(val).toLocaleDateString()
    }
  ];

  return (
    <DashboardLayout>
      <Wrapper>
        <Header>
          <h2>{isPatient ? 'My Billing' : 'Billing & Invoices'}</h2>
          {!isPatient && (
            <Button type="primary" size="large" onClick={() => setIsCreateModalOpen(true)}>
              Create Invoice
            </Button>
          )}
        </Header>

        {!isPatient && (
          <Row gutter={24} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <StatCard>
                <h3>Total Pending</h3>
                <p>${parseFloat(pendingSummary?.pending_amount || 0).toFixed(2)}</p>
                <span style={{color: '#888', fontSize: 12}}>{pendingSummary?.pending_count || 0} Invoices</span>
              </StatCard>
            </Col>
            <Col span={12}>
              <StatCard>
                <h3>Total Paid</h3>
                <p>${parseFloat(paidSummary?.paid_amount || 0).toFixed(2)}</p>
                <span style={{color: '#888', fontSize: 12}}>{paidSummary?.paid_count || 0} Invoices</span>
              </StatCard>
            </Col>
          </Row>
        )}

        {listError && <Alert type="error" message={listError} style={{ marginBottom: 16 }} />}

        <Card title={isPatient ? 'My Invoices' : 'All Invoices'} style={{ borderRadius: 12 }}>
          <Spin spinning={listLoading || submitting}>
            <Table
              dataSource={isPatient ? myInvoices : invoices}
              columns={columns}
              rowKey="id"
            />
          </Spin>
        </Card>

        <Modal
          title="Create New Invoice"
          open={isCreateModalOpen}
          onCancel={() => setIsCreateModalOpen(false)}
          onOk={() => form.submit()}
          confirmLoading={submitting}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateSubmit}>
            <Form.Item
              name="patient_id"
              label="Patient"
              rules={[{ required: true, message: 'Please select a patient' }]}
            >
              <Select placeholder="Select a patient">
                {patients.map(p => (
                  <Select.Option key={p.id} value={p.id}>{p.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="invoice_number"
              label="Invoice Number"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. INV-1001" />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount ($)"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} step={0.01} placeholder="0.00" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Initial Status"
              initialValue="pending"
            >
              <Select>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="paid">Paid</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

      </Wrapper>
    </DashboardLayout>
  );
};

export default InvoicePage;
