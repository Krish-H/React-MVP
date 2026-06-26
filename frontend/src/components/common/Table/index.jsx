import React from 'react';
import styled from 'styled-components';
import { Table as AntTable } from 'antd';
import EmptyState from '../EmptyState';

const StyledTable = styled(AntTable)`
  && {
    .ant-table {
      background: ${({ theme }) => theme.colors.neutral.surface};
      border-radius: ${({ theme }) => theme.radius.medium};
      overflow: hidden;
    }

    .ant-table-thead > tr > th {
      background: ${({ theme }) => theme.colors.neutral.background};
      color: ${({ theme }) => theme.colors.neutral.textSecondary};
      font-weight: ${({ theme }) => theme.typography.weights.semibold};
      font-size: ${({ theme }) => theme.typography.sizes.caption};
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 12px 16px;
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.divider};
      color: ${({ theme }) => theme.colors.neutral.textPrimary};
      font-size: ${({ theme }) => theme.typography.sizes.caption};
      padding: 16px;
    }

    .ant-table-tbody > tr:hover > td {
      background: ${({ theme }) => theme.colors.primary.light};
    }

    .ant-pagination {
      margin-top: ${({ theme }) => theme.spacing.lg};
      
      .ant-pagination-item-active {
        border-color: ${({ theme }) => theme.colors.primary.main};
        a {
          color: ${({ theme }) => theme.colors.primary.main};
        }
      }
    }
  }
`;

const Table = ({ emptyText = "No data available", ...props }) => {
  // Override the default Ant Design empty text with our custom EmptyState
  const locale = {
    emptyText: <EmptyState message={emptyText} />,
    ...props.locale,
  };

  return (
    <StyledTable
      scroll={{ x: 'max-content' }} // Responsive horizontal scrolling by default
      locale={locale}
      {...props}
    />
  );
};

export default Table;
