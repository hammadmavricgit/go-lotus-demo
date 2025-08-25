'use client';

import {
  GenericTable,
  TableColumn,
  SortOptions,
} from '@/components/ui/GenericTable/GenericTable';

// Example User interface
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  loading: boolean;
  searchQuery?: string;
  onSort?: (sortOptions: SortOptions) => void;
  onRowClick?: (user: User) => void;
}

export function UserTable({
  users,
  loading,
  searchQuery,
  onSort,
  onRowClick,
}: UserTableProps) {
  // Define columns for user table
  const columns: TableColumn<User>[] = [
    {
      key: 'firstName',
      header: 'First Name',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'lastName',
      header: 'Last Name',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      width: 'w-1/4',
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      width: 'w-1/6',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: false,
      width: 'w-1/6',
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      sortable: true,
      width: 'w-1/6',
      render: (value) => {
        if (!value) return 'Never';
        return new Date(value).toLocaleDateString();
      },
    },
  ];

  return (
    <GenericTable<User>
      data={users}
      columns={columns}
      loading={loading}
      searchQuery={searchQuery}
      emptyMessage='No users found'
      noResultsMessage='No users match your search'
      onSort={onSort}
      onRowClick={onRowClick}
      statusConfig={{
        field: 'status',
        activeValue: 'Active',
        inactiveValue: 'Inactive',
        activeClass: 'bg-blue-100 text-blue-800',
        inactiveClass: 'bg-red-100 text-red-800',
      }}
      // Custom styling for user table
      containerClassName='bg-white shadow rounded-lg overflow-hidden p-4 h-[calc(100vh-300px)] min-h-[500px] max-h-[800px] flex flex-col'
      headerClassName='bg-gray-50'
      rowClassName='hover:bg-blue-50 cursor-pointer transition-colors focus-within:bg-blue-50'
      cellClassName='px-4 py-4 text-sm text-gray-900 text-left bg-white'
    />
  );
}
