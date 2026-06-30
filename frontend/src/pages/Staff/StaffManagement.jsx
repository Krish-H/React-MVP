import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  Table, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Space, 
  Tag, 
  Popconfirm,
  Switch,
  Typography
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import { useStaff } from '../../modules/staff/hooks/useStaff';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const { Title } = Typography;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SearchContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 16px;
`;

// Helper to map string roles to standard role_ids if needed, 
// or standard roles if the backend expects IDs. 
// Assuming 1: Admin, 2: Doctor, 3: Nurse, 4: Receptionist, 5: Pharmacist
const ROLES = [
  { value: 1, label: 'Admin', color: 'red' },
  { value: 2, label: 'Provider', color: 'blue' },
  { value: 3, label: 'Nurse', color: 'green' },
  { value: 4, label: 'Patient', color: 'purple' },
  { value: 5, label: 'Pharmacist', color: 'orange' },
  { value: 6, label: 'Receptionist', color: 'cyan' },
];

const StaffManagement = () => {
  const { 
    users, 
    pagination, 
    loading, 
    actionLoading, 
    fetchUsers, 
    createStaff, 
    updateStaff,
    deleteStaff,
    toggleStatus
  } = useStaff();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form] = Form.useForm();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: ''
  });

  useEffect(() => {
    fetchUsers(filters);
  }, [filters, fetchUsers]);

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleTableChange = (paginationDetails) => {
    setFilters(prev => ({ 
      ...prev, 
      page: paginationDetails.current,
      limit: paginationDetails.pageSize
    }));
  };

  const showModal = (staff = null) => {
    setEditingStaff(staff);
    if (staff) {
      form.setFieldsValue({
        name: staff.name,
        email: staff.email,
        role_id: staff.role_id,
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingStaff(null);
  };

  const handleFormSubmit = (values) => {
    const onSuccess = () => {
      setIsModalVisible(false);
      form.resetFields();
      setEditingStaff(null);
    };

    if (editingStaff) {
      // Update existing user/staff
      // Per architecture, updating usually happens on the user endpoint
      const updateData = {
        name: values.name,
        email: values.email,
        role: values.role_id,
      };
      
      // If password provided during edit, add it
      if (values.password) {
        updateData.password = values.password;
      }
      
      updateStaff(editingStaff.id, updateData, onSuccess);
    } else {
      // Create new user and staff profile
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role_id: values.role_id,
      };
      
      const staffData = {
        // Staff-specific fields have been removed per API spec
      };
      
      createStaff(userData, staffData, onSuccess);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role_id',
      key: 'role',
      render: (roleId) => {
        const role = ROLES.find(r => r.value === roleId);
        return <Tag color={role?.color || 'default'}>{role?.label || 'User'}</Tag>;
      },
    },
    // Department column removed as it's no longer in the API spec
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        // Safely check is_active or status. Default to true if undefined.
        // Handle boolean, integer (0/1), and string ("0"/"1") returns from PHP backend
        const checkValue = record.is_active !== undefined ? record.is_active : record.status;
        const isActive = checkValue === undefined ? true : (checkValue === true || checkValue === 1 || checkValue === "1" || checkValue === "active");
        const currentStatus = isActive ? 'active' : 'inactive';
        
        return (
          <Switch 
            checked={isActive} 
            onChange={() => toggleStatus(record.id, currentStatus)}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}><EditOutlined /> Edit</a>
          <Popconfirm
            title="Delete this staff member?"
            description="Are you sure you want to delete this staff member?"
            onConfirm={() => deleteStaff(record.id)}
            okText="Yes, delete"
            cancelText="Cancel"
          >
            <a style={{ color: 'red' }}><DeleteOutlined /> Remove</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader>
        <Title level={3} style={{ margin: 0 }}>Staff Management</Title>
        <Button variant="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add New Staff
        </Button>
      </PageHeader>

      <Card>
        <SearchContainer>
          <Input.Search
            placeholder="Search by name or email..."
            onChange={handleSearch}
            style={{ width: 300 }}
            allowClear
          />
        </SearchContainer>
        
        <Table 
          columns={columns} 
          dataSource={users} 
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.page,
            pageSize: pagination.limit,
            total: pagination.total,
            showSizeChanger: true
          }}
          onChange={handleTableChange}
        />
      </Card>

      <Modal
        title={editingStaff ? "Edit Staff Member" : "Add New Staff"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="john@example.com" />
          </Form.Item>

          {!editingStaff && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter a password' }]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>
          )}

          {editingStaff && (
            <Form.Item
              name="password"
              label="New Password (optional)"
              extra="Leave blank to keep the current password"
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>
          )}

          <Form.Item
            name="role_id"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Select a role" options={ROLES} />
          </Form.Item>



          <Form.Item style={{ marginTop: 24, marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button variant="primary" htmlType="submit" loading={actionLoading}>
                {editingStaff ? 'Update Staff' : 'Create Staff'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default StaffManagement;
