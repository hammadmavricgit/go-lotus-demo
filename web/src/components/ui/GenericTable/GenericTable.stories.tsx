import type { Meta, StoryObj } from '@storybook/react';
import { GenericTable, TableColumn } from './GenericTable';

interface TestData {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
}

const meta: Meta<typeof GenericTable<TestData>> = {
  title: 'UI/GenericTable',
  component: GenericTable<TestData>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A generic, reusable table component with sorting, searching, and custom rendering capabilities.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData: TestData[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'Active',
    role: 'User',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    status: 'Inactive',
    role: 'User',
  },
];

const columns: TableColumn<TestData>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    sortable: false,
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
    loading: false,
    emptyMessage: 'No data found',
    noResultsMessage: 'No results found',
  },
};

export const WithCustomRendering: Story = {
  args: {
    data: sampleData,
    columns: [
      {
        key: 'name',
        header: 'Name',
        sortable: true,
        render: (value: any, row: TestData) => (
          <div className='font-semibold text-blue-600'>{row.name}</div>
        ),
      },
      {
        key: 'email',
        header: 'Email',
        sortable: true,
      },
      {
        key: 'status',
        header: 'Status',
        sortable: false,
        render: (value: any, row: TestData) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              row.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        sortable: true,
      },
    ],
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: columns,
    loading: false,
    emptyMessage: 'No users found',
  },
};

export const WithSearchResults: Story = {
  args: {
    data: [],
    columns: columns,
    loading: false,
    searchQuery: 'john',
    noResultsMessage: 'No users match your search',
  },
};
