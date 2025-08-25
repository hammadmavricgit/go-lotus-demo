'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useStaff } from '@/hooks/useStaff';
import { StaffTabs } from '@/components/staff/StaffTabs';
import { StaffSearch } from '@/components/staff/StaffSearch';
import { AddStaffButton } from '@/components/staff/AddStaffButton';
import { StaffPagination } from '@/components/staff/StaffPagination';
import { Staff, StaffFilters, StaffSortOptions } from '@/lib/types/staff';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { StaffTableNew } from '@/components/staff/StaffTableNew';

export default function StaffPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'current' | 'archived' | 'all'>(
    'current'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOptions, setSortOptions] = useState<StaffSortOptions>({
    field: 'firstName',
    direction: 'ASC',
  });

  const {
    staff,
    loading: staffLoading,
    error,
    total,
    page,
    pageCount,
    fetchStaff,
  } = useStaff();

  const { user, loading: authLoading } = useEnhancedAuth();

  // Redirect staff users to clients page
  useEffect(() => {
    if (!authLoading && user && user.role === 'staff') {
      router.push('/clients');
    }
  }, [user, authLoading, router]);

  // Handle tab changes
  const handleTabChange = (tab: 'current' | 'archived' | 'all') => {
    setActiveTab(tab);
    // Reset to first page when changing tabs
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset to first page when searching
  };

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    const filters: StaffFilters = {
      page: pageNumber,
      limit: 10,
      search: searchQuery || undefined,
      status:
        activeTab === 'all'
          ? undefined
          : activeTab === 'current'
          ? 'Current'
          : 'Archived',
    };
    fetchStaff(filters);
  };

  // Handle sorting
  const handleSort = (sortOptions: StaffSortOptions) => {
    setSortOptions(sortOptions);
  };

  // Fetch staff data when filters change
  useEffect(() => {
    const filters: StaffFilters = {
      page: 1, // Always start from page 1 when filters change
      limit: 10,
      search: searchQuery || undefined,
      status:
        activeTab === 'all'
          ? undefined
          : activeTab === 'current'
          ? 'Current'
          : 'Archived',
    };

    fetchStaff(filters);
  }, [activeTab, searchQuery, fetchStaff]);

  // Handle row click - navigate to staff details page
  const handleRowClick = (staffMember: Staff) => {
    router.push(`/staff/${staffMember.id}`);
  };

  // Handle staff added successfully
  const handleStaffAdded = () => {
    // Refresh the staff list to include the newly invited staff member
    fetchStaff();
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <div className='min-h-screen'>
        {/* Main Content */}
        <main className='flex-1'>
          <div className=' mx-auto'>
            {/* Header with Title and Tabs */}
            <div className='flex flex-row gap-6 items-start justify-start pb-4 mb-4'>
              <h1 className='text-[36px] font-semibold text-[rgba(0,0,0,0.8)] font-manrope whitespace-nowrap'>
                Staff
              </h1>
              <div className='flex flex-row items-center justify-start'>
                <StaffTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
            </div>

            {/* Instructional Text */}
            <div className='mb-4'>
              <p className='text-[14px] text-[#000101] leading-[1.4]'>
                <span>
                  To manage user roles and send, resend or cancel invites, go to{' '}
                </span>
                <span className='underline font-semibold text-[#11151b]'>
                  Control Center
                </span>
                <span className='text-[#11151b]'>{' > '} </span>
                <span className='text-[#11151b]'> </span>
                <span className='underline font-semibold text-[#11151b]'>
                  User
                </span>
                <span className='underline font-semibold text-[#11151b]'>
                  {' '}
                </span>
                <span className='underline font-semibold text-[#11151b]'>
                  Accounts
                </span>
                <span className='text-[#11151b]'>.</span>
              </p>
            </div>

            {/* Search and Add Button Row */}
            <div className='flex flex-row items-start justify-between px-4 mb-6'>
              <div className='w-[358px]'>
                <StaffSearch onSearch={handleSearch} />
              </div>
              <div className='flex-shrink-0'>
                <AddStaffButton onStaffAdded={handleStaffAdded} />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-red-800 text-sm'>{error}</p>
              </div>
            )}

            {/* Staff Table */}
            <div className='mb-6'>
              <StaffTableNew
                staff={staff}
                loading={staffLoading}
                searchQuery={searchQuery}
                onSort={handleSort}
                onRowClick={handleRowClick}
              />
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className='flex justify-center'>
                <StaffPagination
                  currentPage={page}
                  totalPages={pageCount}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* Results Summary */}
            {!staffLoading && staff.length > 0 && (
              <div className='mt-4 text-center text-sm text-gray-600'>
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of{' '}
                {total} staff members
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
