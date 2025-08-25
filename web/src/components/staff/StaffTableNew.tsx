'use client';

import { Staff, StaffSortOptions } from '@/lib/types/staff';
import {
  GenericTable,
  TableColumn,
  SortOptions,
} from '@/components/ui/GenericTable/GenericTable';

interface StaffTableNewProps {
  staff: Staff[];
  loading: boolean;
  searchQuery?: string;
  onSort?: (sortOptions: StaffSortOptions) => void;
  onRowClick?: (staff: Staff) => void;
}

export function StaffTableNew({
  staff,
  loading,
  searchQuery,
  onSort,
  onRowClick,
}: StaffTableNewProps) {
  // Define columns for staff table
  const columns: TableColumn<Staff>[] = [
    {
      key: 'firstName',
      header: 'First Name',
      sortable: true,
      render: (value, row) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      render: (value, row) => row.email,
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      render: (value, row) => row.title || 'Not provided',
    },
    {
      key: 'primaryPhone',
      header: 'Phone',
      sortable: false,
      render: (value, row) => row.primaryPhone || 'Not provided',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: false,
      render: (value, row) => row.status,
    },
  ];

  // Handle sort conversion from generic to staff-specific
  const handleSort = (sortOptions: SortOptions) => {
    if (onSort) {
      const staffSortOptions: StaffSortOptions = {
        field: sortOptions.field as StaffSortOptions['field'],
        direction: sortOptions.direction,
      };
      onSort(staffSortOptions);
    }
  };

  return (
    <GenericTable<Staff>
      data={staff}
      columns={columns}
      loading={loading}
      searchQuery={searchQuery}
      emptyMessage='No staff members found'
      noResultsMessage='No staff members match your search'
      onSort={handleSort}
      onRowClick={onRowClick}
      statusConfig={{
        field: 'status',
        activeValue: 'Current',
        inactiveValue: 'Archived',
        activeClass: 'bg-green-100 text-green-800',
        inactiveClass: 'bg-gray-100 text-gray-800',
      }}
    />
  );
}
