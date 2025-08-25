import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from './LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the loading spinner',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='text-center'>
        <LoadingSpinner size='sm' />
        <p className='text-sm text-gray-600 mt-2'>Small</p>
      </div>
      <div className='text-center'>
        <LoadingSpinner size='md' />
        <p className='text-sm text-gray-600 mt-2'>Medium</p>
      </div>
      <div className='text-center'>
        <LoadingSpinner size='lg' />
        <p className='text-sm text-gray-600 mt-2'>Large</p>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <LoadingSpinner size='md' />
      <p className='text-sm text-gray-600'>Loading staff data...</p>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className='w-80 p-6 border rounded-lg shadow-sm'>
      <div className='flex flex-col items-center gap-4'>
        <LoadingSpinner size='md' />
        <p className='text-sm text-gray-600'>Loading clinic information...</p>
      </div>
    </div>
  ),
};

export const StaffSectionLoading: Story = {
  render: () => (
    <div className='w-full max-w-md p-6 border rounded-lg shadow-sm'>
      <div className='flex items-center gap-3'>
        <LoadingSpinner size='sm' />
        <div>
          <h3 className='font-medium text-gray-900'>Staff Hours</h3>
          <p className='text-sm text-gray-600'>Loading working hours...</p>
        </div>
      </div>
    </div>
  ),
};

export const EmergencyContactsLoading: Story = {
  render: () => (
    <div className='w-full max-w-md p-6 border rounded-lg shadow-sm'>
      <div className='flex items-center gap-3'>
        <LoadingSpinner size='sm' />
        <div>
          <h3 className='font-medium text-gray-900'>Emergency Contacts</h3>
          <p className='text-sm text-gray-600'>
            Loading contact information...
          </p>
        </div>
      </div>
    </div>
  ),
};

export const CredentialsLoading: Story = {
  render: () => (
    <div className='w-full max-w-md p-6 border rounded-lg shadow-sm'>
      <div className='flex items-center gap-3'>
        <LoadingSpinner size='sm' />
        <div>
          <h3 className='font-medium text-gray-900'>Staff Credentials</h3>
          <p className='text-sm text-gray-600'>Loading credentials...</p>
        </div>
      </div>
    </div>
  ),
};

export const SpecialConditionsLoading: Story = {
  render: () => (
    <div className='w-full max-w-md p-6 border rounded-lg shadow-sm'>
      <div className='flex items-center gap-3'>
        <LoadingSpinner size='sm' />
        <div>
          <h3 className='font-medium text-gray-900'>Special Conditions</h3>
          <p className='text-sm text-gray-600'>Loading special conditions...</p>
        </div>
      </div>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <LoadingSpinner size='sm' className='sm:hidden' />
      <LoadingSpinner size='md' className='hidden sm:block md:hidden' />
      <LoadingSpinner size='lg' className='hidden md:block' />
      <p className='text-sm text-gray-600'>
        Spinner size adapts to screen size
      </p>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className='flex items-center gap-8'>
      <div className='text-center'>
        <LoadingSpinner size='md' className='text-blue-600' />
        <p className='text-sm text-gray-600 mt-2'>Blue</p>
      </div>
      <div className='text-center'>
        <LoadingSpinner size='md' className='text-green-600' />
        <p className='text-sm text-gray-600 mt-2'>Green</p>
      </div>
      <div className='text-center'>
        <LoadingSpinner size='md' className='text-red-600' />
        <p className='text-sm text-gray-600 mt-2'>Red</p>
      </div>
    </div>
  ),
};
