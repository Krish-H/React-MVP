import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const { Option } = Select;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const SearchWrapper = styled.div`
  flex: 1;
  min-width: 220px;

  .ant-input-affix-wrapper {
    border-radius: ${({ theme }) => theme.radius.medium};
    border-color: ${({ theme }) => theme.colors.neutral.border};
    &:focus-within {
      border-color: ${({ theme }) => theme.colors.primary.main};
      box-shadow: ${({ theme }) => theme.shadows.inputFocus};
    }
  }
`;

const StyledSelect = styled(Select)`
  min-width: 140px;
  .ant-select-selector {
    border-radius: ${({ theme }) => theme.radius.medium} !important;
  }
`;

const FilterButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: ${({ theme }) => theme.radius.medium};
  border-color: ${({ theme }) => theme.colors.neutral.border};
  color: ${({ theme }) => theme.colors.neutral.textSecondary};
  font-weight: 500;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  svg { font-size: 18px; }
`;

const PatientFilters = ({ onSearch, onGenderFilter, onStatusFilter }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <FiltersRow>
      <SearchWrapper>
        <Input
          placeholder="Search by name, ID, or phone..."
          prefix={<SearchIcon style={{ fontSize: 18, color: '#64748B' }} />}
          value={search}
          onChange={handleSearch}
          allowClear
        />
      </SearchWrapper>

      <StyledSelect
        defaultValue="all"
        onChange={(val) => onGenderFilter && onGenderFilter(val)}
      >
        <Option value="all">All Genders</Option>
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
      </StyledSelect>

      <StyledSelect
        defaultValue="all"
        onChange={(val) => onStatusFilter && onStatusFilter(val)}
      >
        <Option value="all">All Status</Option>
        <Option value="Active">Active</Option>
        <Option value="Inactive">Inactive</Option>
        <Option value="Critical">Critical</Option>
      </StyledSelect>

      <FilterButton icon={<FilterListIcon />}>
        More Filters
      </FilterButton>
    </FiltersRow>
  );
};

export default PatientFilters;
