'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useClerkAuth';
import { useRoleBasedAuth } from '@/lib/role-based-auth';
import { UserRole } from '@/lib/role-based-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: UserRole;
  requiredPermission?: string;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  requireAuth = true,
  requiredRole,
  requiredPermission,
  redirectTo = '/',
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasPermission, checkAccess } = useRoleBasedAuth();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        // Redirect to auth if authentication is required but user is not authenticated
        router.push('/auth');
      } else if (!requireAuth && isAuthenticated) {
        // Redirect to dashboard if authentication is not required but user is authenticated (e.g., auth page)
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, router]);

  // Check role-based access
  useEffect(() => {
    const checkRoleAccess = async () => {
      if (!isAuthenticated || isLoading) return;

      setIsCheckingAccess(true);
      try {
        let access = true;

        // Check required role
        if (requiredRole) {
          access = await checkAccess(requiredRole);
        }

        // Check required permission
        if (requiredPermission && access) {
          access = hasPermission('admin', requiredPermission as any);
        }

        setHasAccess(access);
      } catch (error) {
        console.error('Error checking role access:', error);
        setHasAccess(false);
      } finally {
        setIsCheckingAccess(false);
      }
    };

    checkRoleAccess();
  }, [
    isAuthenticated,
    isLoading,
    requiredRole,
    requiredPermission,
    checkAccess,
    hasPermission,
  ]);

  if (isLoading || isCheckingAccess) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  // Show content only if authentication requirements are met
  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (!requireAuth && isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // Check role-based access
  if (requiredRole || requiredPermission) {
    if (hasAccess === false) {
      // Redirect to specified page if access is denied
      router.push(redirectTo);
      return (
        <div className='min-h-screen bg-background flex items-center justify-center'>
          <div className='text-center'>
            <div className='text-red-500 text-lg font-semibold mb-2'>
              Access Denied
            </div>
            <p className='text-gray-600'>
              You don't have permission to access this page.
            </p>
            <p className='text-gray-500 text-sm mt-2'>Redirecting...</p>
          </div>
        </div>
      );
    }

    if (hasAccess === null) {
      return (
        <div className='min-h-screen bg-background flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Checking permissions...</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
