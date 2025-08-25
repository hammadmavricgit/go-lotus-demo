'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Generic types for the table
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface SortOptions {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface GenericTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  searchQuery?: string;
  emptyMessage?: string;
  noResultsMessage?: string;
  onSort?: (sortOptions: SortOptions) => void;
  onRowClick?: (row: T) => void;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  statusConfig?: {
    field: keyof T;
    activeValue: any;
    inactiveValue: any;
    activeClass?: string;
    inactiveClass?: string;
  };
}

export function GenericTable<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  searchQuery,
  emptyMessage = 'No data found',
  noResultsMessage = 'No results found',
  onSort,
  onRowClick,
  className = '',
  containerClassName = 'bg-[#f4ede2] shadow rounded-lg overflow-hidden p-4 h-[calc(100vh-300px)] min-h-[500px] max-h-[800px] flex flex-col',
  headerClassName = 'bg-[#f4ede2]',
  rowClassName = 'hover:bg-gray-50 cursor-pointer transition-colors focus-within:bg-gray-50',
  cellClassName = 'px-4 py-4 text-sm text-[#000101] text-left bg-white',
  statusConfig,
}: GenericTableProps<T>) {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');

  const handleSort = (field: string) => {
    if (!onSort) return;

    const newDirection =
      sortField === field && sortDirection === 'ASC' ? 'DESC' : 'ASC';
    setSortField(field);
    setSortDirection(newDirection);
    onSort({ field, direction: newDirection });
  };

  const getSortIcon = (field: string) => {
    if (!onSort) return null;

    if (sortField !== field) {
      return <ChevronUp className='w-4 h-4 text-gray-400' />;
    }
    return sortDirection === 'ASC' ? (
      <ChevronUp className='w-4 h-4 text-gray-600' />
    ) : (
      <ChevronDown className='w-4 h-4 text-gray-600' />
    );
  };

  const renderCell = (column: TableColumn<T>, row: T) => {
    const value = column.key in row ? row[column.key as keyof T] : '';

    // Custom render function
    if (column.render) {
      return column.render(value, row);
    }

    // Status badge rendering
    if (statusConfig && column.key === statusConfig.field) {
      const isActive = value === statusConfig.activeValue;
      const statusClass = isActive
        ? statusConfig.activeClass || 'bg-green-100 text-green-800'
        : statusConfig.inactiveClass || 'bg-gray-100 text-gray-800';

      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusClass}`}
        >
          {String(value || '')}
        </span>
      );
    }

    // Default rendering
    return String(value || '-');
  };

  if (loading) {
    return (
      <div className={containerClassName}>
        <div className='animate-pulse'>
          {/* Header skeleton */}
          <div className='flex-shrink-0 bg-[#f4ede2] px-4 py-3'>
            <div className='h-4 bg-gray-300 rounded w-1/4'></div>
          </div>
          {/* Body skeleton */}
          <div className='flex-1 overflow-y-auto'>
            {[...Array(10)].map((_, i) => (
              <div key={i} className='px-4 py-4 bg-white mb-2'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {/* Fixed Header */}
      <div className='flex-shrink-0'>
        <table className='min-w-full border-separate border-spacing-y-2 table-fixed'>
          <thead className={headerClassName}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={String(column.key)}
                  scope='col'
                  className={`${
                    column.width || 'w-1/5'
                  } px-4 py-3 text-left text-sm font-medium text-[#11151b] ${
                    column.sortable && onSort
                      ? 'cursor-pointer hover:bg-[#e8e0d0] focus:bg-[#e8e0d0] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:ring-inset transition-colors'
                      : ''
                  }`}
                  onClick={() =>
                    column.sortable &&
                    onSort &&
                    handleSort(column.key as string)
                  }
                  onKeyDown={(e) => {
                    if (
                      column.sortable &&
                      onSort &&
                      (e.key === 'Enter' || e.key === ' ')
                    ) {
                      e.preventDefault();
                      handleSort(column.key as string);
                    }
                  }}
                  tabIndex={column.sortable && onSort ? 0 : undefined}
                  role={column.sortable && onSort ? 'button' : undefined}
                  aria-label={
                    column.sortable && onSort
                      ? `Sort by ${column.header}`
                      : undefined
                  }
                >
                  <div className='flex items-center gap-2'>
                    {column.header}
                    {column.sortable && getSortIcon(column.key as string)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Scrollable Body */}
      <div className='flex-1 overflow-y-auto overflow-x-auto'>
        <table className='min-w-full border-separate border-spacing-y-2 table-fixed'>
          <tbody className='bg-transparent'>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-4 py-8 text-center text-gray-500'
                >
                  {searchQuery ? (
                    <div>
                      <p className='text-lg font-medium mb-2'>
                        {noResultsMessage}
                      </p>
                      <p className='text-sm text-gray-400'>
                        No results match &quot;{searchQuery}&quot;
                      </p>
                    </div>
                  ) : (
                    emptyMessage
                  )}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id}
                  className={rowClassName}
                  onClick={() => onRowClick?.(row)}
                  onKeyDown={(e) => {
                    if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onRowClick(row);
                    }
                  }}
                  tabIndex={onRowClick ? 0 : undefined}
                  role={onRowClick ? 'button' : undefined}
                  aria-label={
                    onRowClick ? `View details for ${row.id}` : undefined
                  }
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={String(column.key)}
                      className={`${cellClassName} ${column.width || 'w-1/5'} ${
                        colIndex === 0 ? 'rounded-l-lg' : ''
                      } ${
                        colIndex === columns.length - 1 ? 'rounded-r-lg' : ''
                      }`}
                    >
                      {renderCell(column, row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
