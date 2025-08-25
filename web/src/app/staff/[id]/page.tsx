'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StaffDetailsPage } from '@/components/staff/StaffDetailsPage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage';
import Head from 'next/head';

interface StaffDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function StaffDetailsPageRoute({
  params,
}: StaffDetailsPageProps) {
  const [staffId, setStaffId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [staffName, setStaffName] = useState<string>('');

  useEffect(() => {
    const loadParams = async () => {
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        if (!id) {
          setError('Staff ID is required');
          setIsLoading(false);
          return;
        }

        setStaffId(id);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load staff details');
        setIsLoading(false);
      }
    };

    loadParams();
  }, [params]);

  // Update page title when staff name is available
  useEffect(() => {
    if (staffName) {
      document.title = `${staffName} - Staff Details | Lotus`;
    } else if (staffId) {
      document.title = `Staff Details | Lotus`;
    }
  }, [staffName, staffId]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading Staff Details | Lotus</title>
          <meta name='description' content='Loading staff member details...' />
          <meta name='robots' content='noindex' />
        </Head>
        <div className='flex items-center justify-center min-h-screen'>
          <LoadingSpinner size='lg' />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error - Staff Details | Lotus</title>
          <meta name='description' content='Error loading staff details' />
          <meta name='robots' content='noindex' />
        </Head>
        <div className='flex items-center justify-center min-h-screen'>
          <ErrorMessage message={error} />
        </div>
      </>
    );
  }

  if (!staffId) {
    return (
      <>
        <Head>
          <title>Invalid Staff ID | Lotus</title>
          <meta name='description' content='Invalid staff member ID provided' />
          <meta name='robots' content='noindex' />
        </Head>
        <div className='flex items-center justify-center min-h-screen'>
          <ErrorMessage message='Invalid staff ID' />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {staffName ? `${staffName} - Staff Details` : 'Staff Details'} | Lotus
        </title>
        <meta
          name='description'
          content={
            staffName
              ? `View detailed information for ${staffName}, including profile, hours, credentials, and contact information.`
              : 'View comprehensive staff member details including profile, hours, credentials, and contact information.'
          }
        />
        <meta
          name='keywords'
          content='staff, employee, profile, details, lotus, healthcare'
        />
        <meta
          property='og:title'
          content={`${staffName || 'Staff'} Details | Lotus`}
        />
        <meta
          property='og:description'
          content='View comprehensive staff member details'
        />
        <meta property='og:type' content='profile' />
        <meta property='og:url' content={`/staff/${staffId}`} />
        <meta name='twitter:card' content='summary' />
        <meta
          name='twitter:title'
          content={`${staffName || 'Staff'} Details | Lotus`}
        />
        <meta
          name='twitter:description'
          content='View comprehensive staff member details'
        />
        <link rel='canonical' href={`/staff/${staffId}`} />
      </Head>
      <StaffDetailsPage staffId={staffId} onStaffNameChange={setStaffName} />
    </>
  );
}
