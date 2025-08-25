# Generic Table Component

A flexible, reusable table component that can be used for different entities like staff, users, products, etc.

## Features

- ✅ **Generic & Type-safe**: Works with any data type that has an `id` field
- ✅ **Sortable Columns**: Configurable sorting for any column
- ✅ **Custom Rendering**: Custom cell renderers for complex data
- ✅ **Status Badges**: Built-in status badge support
- ✅ **Loading States**: Skeleton loading animation
- ✅ **Empty States**: Customizable empty and no-results messages
- ✅ **Accessibility**: Full keyboard navigation and ARIA support
- ✅ **Customizable Styling**: Flexible CSS class customization
- ✅ **Row Click Handlers**: Click and keyboard interaction support

## Basic Usage

```tsx
import { GenericTable, TableColumn } from '@/components/ui/generic-table';

interface MyEntity {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const columns: TableColumn<MyEntity>[] = [
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
];

function MyTable({ data, loading }) {
  return (
    <GenericTable<MyEntity>
      data={data}
      columns={columns}
      loading={loading}
      onSort={(sortOptions) => console.log('Sort:', sortOptions)}
      onRowClick={(row) => console.log('Clicked:', row)}
    />
  );
}
```

## Column Configuration

### Basic Column

```tsx
{
  key: 'name',
  header: 'Name',
  sortable: true,
}
```

### Column with Custom Width

```tsx
{
  key: 'email',
  header: 'Email',
  width: 'w-1/3',
  sortable: true,
}
```

### Column with Custom Renderer

```tsx
{
  key: 'createdAt',
  header: 'Created Date',
  sortable: true,
  render: (value) => new Date(value).toLocaleDateString(),
}
```

### Column with Complex Renderer

```tsx
{
  key: 'actions',
  header: 'Actions',
  sortable: false,
  render: (value, row) => (
    <Button onClick={() => handleEdit(row)}>Edit</Button>
  ),
}
```

## Status Configuration

For entities with status fields, you can configure automatic badge rendering:

```tsx
<GenericTable<MyEntity>
  data={data}
  columns={columns}
  statusConfig={{
    field: 'status',
    activeValue: 'Active',
    inactiveValue: 'Inactive',
    activeClass: 'bg-green-100 text-green-800',
    inactiveClass: 'bg-red-100 text-red-800',
  }}
/>
```

## Custom Styling

You can customize the appearance by overriding CSS classes:

```tsx
<GenericTable<MyEntity>
  data={data}
  columns={columns}
  containerClassName='bg-white shadow-lg rounded-xl p-6'
  headerClassName='bg-blue-50'
  rowClassName='hover:bg-blue-50 cursor-pointer'
  cellClassName='px-6 py-4 text-sm text-gray-900'
/>
```

## Complete Example: Staff Table

```tsx
'use client';

import { Staff } from '@/lib/types/staff';
import { GenericTable, TableColumn } from '@/components/ui/generic-table';

const columns: TableColumn<Staff>[] = [
  {
    key: 'name',
    header: 'Staff Name',
    sortable: true,
  },
  {
    key: 'title',
    header: 'Title',
    sortable: true,
  },
  {
    key: 'mobilePhone',
    header: 'Mobile Phone',
    sortable: false,
  },
  {
    key: 'status',
    header: 'Status',
    sortable: false,
  },
  {
    key: 'supervisor',
    header: 'Supervisor',
    sortable: true,
  },
];

export function StaffTable({ staff, loading, onSort, onRowClick }) {
  return (
    <GenericTable<Staff>
      data={staff}
      columns={columns}
      loading={loading}
      onSort={onSort}
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
```

## Props Reference

### GenericTableProps<T>

| Prop                 | Type                             | Default              | Description                          |
| -------------------- | -------------------------------- | -------------------- | ------------------------------------ |
| `data`               | `T[]`                            | -                    | Array of data to display             |
| `columns`            | `TableColumn<T>[]`               | -                    | Column definitions                   |
| `loading`            | `boolean`                        | `false`              | Show loading skeleton                |
| `searchQuery`        | `string`                         | -                    | Current search query for empty state |
| `emptyMessage`       | `string`                         | `'No data found'`    | Message when no data                 |
| `noResultsMessage`   | `string`                         | `'No results found'` | Message when search has no results   |
| `onSort`             | `(options: SortOptions) => void` | -                    | Sort handler                         |
| `onRowClick`         | `(row: T) => void`               | -                    | Row click handler                    |
| `className`          | `string`                         | `''`                 | Additional CSS classes               |
| `containerClassName` | `string`                         | Default styling      | Container CSS classes                |
| `headerClassName`    | `string`                         | Default styling      | Header CSS classes                   |
| `rowClassName`       | `string`                         | Default styling      | Row CSS classes                      |
| `cellClassName`      | `string`                         | Default styling      | Cell CSS classes                     |
| `statusConfig`       | `StatusConfig`                   | -                    | Status badge configuration           |

### TableColumn<T>

| Prop       | Type                                      | Default   | Description                         |
| ---------- | ----------------------------------------- | --------- | ----------------------------------- |
| `key`      | `keyof T \| string`                       | -         | Data field key or custom identifier |
| `header`   | `string`                                  | -         | Column header text                  |
| `width`    | `string`                                  | `'w-1/5'` | Tailwind width class                |
| `sortable` | `boolean`                                 | `false`   | Enable sorting for this column      |
| `render`   | `(value: any, row: T) => React.ReactNode` | -         | Custom cell renderer                |

### SortOptions

| Prop        | Type              | Description           |
| ----------- | ----------------- | --------------------- |
| `field`     | `string`          | Field name to sort by |
| `direction` | `'ASC' \| 'DESC'` | Sort direction        |

## Migration from Specific Tables

To migrate from a specific table (like StaffTable) to the generic table:

1. **Define your data interface** (ensure it has an `id` field)
2. **Create column definitions** using `TableColumn<T>[]`
3. **Configure status badges** if needed
4. **Replace the specific table** with `GenericTable<T>`

The generic table maintains all the functionality of the original tables while providing flexibility for different data types.
