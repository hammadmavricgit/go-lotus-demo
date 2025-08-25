'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useClerkAuth';
import { Sidebar } from '@/components/layout/Sidebar';
import { MainContent } from '@/components/layout/MainContent';
import { LayoutProvider } from '@/components/layout/LayoutProvider';
import { useEffect, useState } from 'react';

// Routes that should NOT have the sidebar layout
const NO_LAYOUT_ROUTES = ['/auth', '/invitations/accept'];

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by ensuring we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading while auth is being determined to prevent layout blink
  if (isLoading || !isClient) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto'></div>
          <p className='mt-2 text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  // Check if current route should have no layout
  const shouldHideLayout =
    NO_LAYOUT_ROUTES.some((route) => pathname?.startsWith(route)) ||
    !isAuthenticated;

  if (shouldHideLayout) {
    // Return clean layout for auth, invitation pages, or unauthenticated users
    return <>{children}</>;
  }

  // Return sidebar layout for authenticated dashboard pages
  return (
    <LayoutProvider>
      <div className='flex h-screen w-full overflow-hidden'>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </LayoutProvider>
  );
}
