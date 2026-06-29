import React from 'react';
import { Table, Tooltip, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StatusBadge } from '../styles/patientStyles';

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radius.small};
  color: ${({ $color, theme }) => $color || theme.colors.primary.main};
  display: inline-flex;
  align-items: center;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  svg { font-size: 18px; }
`;

const ActionsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PatientTable = ({ data, onDelete }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Patient ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <span style={{ fontWeight: 600, color: '#2563EB', fontFamily: 'monospace' }}>PT-{id}</span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name?.localeCompare(b.name),
      render: (name) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 90,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Blood Group',
      dataIndex: 'blood_group',
      key: 'blood_group',
      width: 110,
      render: (blood) => (
        <span style={{ fontWeight: 600, color: '#EF4444' }}>{blood || '—'}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <ActionsCell>
          <Tooltip title="View Details">
            <ActionButton onClick={() => navigate(`/patients/${record.id}`)}>
              <VisibilityIcon />
            </ActionButton>
          </Tooltip>
          <Tooltip title="Edit Patient">
            <ActionButton $color="#10B981" onClick={() => navigate(`/patients/${record.id}/edit`)}>
              <EditIcon />
            </ActionButton>
          </Tooltip>
          <Popconfirm
            title="Delete this patient?"
            description="This action cannot be undone."
            onConfirm={() => onDelete && onDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete">
              <ActionButton $color="#EF4444">
                <DeleteIcon />
              </ActionButton>
            </Tooltip>
          </Popconfirm>
        </ActionsCell>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} patients`,
      }}
      scroll={{ x: 700 }}
      size="middle"
    />
  );
};

export default PatientTable;
