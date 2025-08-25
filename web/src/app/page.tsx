'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { InviteStaffButton } from '@/components/invitations/InviteStaffButton';

export default function Home() {
  const { user, loading } = useEnhancedAuth();
  const router = useRouter();

  // Redirect staff users to clients page
  useEffect(() => {
    if (!loading && user && user.role === 'staff') {
      router.push('/clients');
    }
  }, [user, loading, router]);

  return (
    <ProtectedRoute requireAuth={true}>
      <div className='min-h-screen bg-gray-50'>
        <nav className='bg-white shadow-sm border-b border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <h1 className='text-xl font-semibold text-gray-900 tracking-tight'>
                Dashboard
              </h1>
              <div className='flex items-center gap-3'>
                {/* Admin Navigation - Only visible for admin users */}
                {user && user.role === 'admin' && (
                  <InviteStaffButton className='px-4 py-2' />
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
          <div className='px-4 py-6 sm:px-0 space-y-6'>
            {/* User Profile Section */}
            <div className='bg-white shadow rounded-lg p-6'>
              <h2 className='text-lg font-medium text-gray-900 mb-4'>
                Welcome to Go Lotus!
              </h2>

              {user ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Email
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>{user.email}</p>
                  </div>

                  {user.firstName && (
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        First Name
                      </label>
                      <p className='mt-1 text-sm text-gray-900'>
                        {user.firstName}
                      </p>
                    </div>
                  )}

                  {user.lastName && (
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Last Name
                      </label>
                      <p className='mt-1 text-sm text-gray-900'>
                        {user.lastName}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Role
                    </label>
                    <p className='mt-1 text-sm text-gray-900 capitalize'>
                      {user.role}
                      {user.role === 'admin' && (
                        <span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800'>
                          Administrator
                        </span>
                      )}
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Status
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {user.status}
                      <span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                        Active
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                <p className='text-gray-600'>User information not available</p>
              )}
            </div>

            {/* Staff Dashboard Content */}
            {user && user.role === 'staff' && (
              <div className='bg-white shadow rounded-lg p-6'>
                <h3 className='text-lg font-medium text-gray-900 mb-4'>
                  Your Dashboard
                </h3>
                <p className='text-gray-600'>
                  Welcome to your Go Lotus dashboard. Your team workspace and
                  projects will appear here.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
