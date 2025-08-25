import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Error message to display',
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
  args: {
    message: 'An error occurred while loading the data.',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'This is a very long error message that demonstrates how the component handles text wrapping and overflow. It should be properly contained within the component boundaries.',
  },
};

export const ShortMessage: Story = {
  args: {
    message: 'Failed to load.',
  },
};

export const StaffDetailsError: Story = {
  args: {
    message: 'Failed to load staff details. Please try refreshing the page.',
  },
};

export const NetworkError: Story = {
  args: {
    message:
      'Network error: Unable to connect to the server. Please check your internet connection and try again.',
  },
};

export const ValidationError: Story = {
  args: {
    message: 'Please fill in all required fields before submitting the form.',
  },
};

export const PermissionError: Story = {
  args: {
    message:
      'You do not have permission to access this resource. Please contact your administrator.',
  },
};

export const InCard: Story = {
  render: (args) => (
    <div className='w-80 p-6 border rounded-lg shadow-sm'>
      <ErrorMessage {...args} />
    </div>
  ),
  args: {
    message: 'Error loading clinic information.',
  },
};

export const WithRetryButton: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <ErrorMessage {...args} />
      <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
        Try Again
      </button>
    </div>
  ),
  args: {
    message: 'Failed to load staff data. Please try again.',
  },
};

export const MultipleErrors: Story = {
  render: () => (
    <div className='space-y-4'>
      <ErrorMessage message='Failed to load staff profile.' />
      <ErrorMessage message='Unable to fetch working hours.' />
      <ErrorMessage message='Error loading emergency contacts.' />
    </div>
  ),
};

export const Responsive: Story = {
  render: (args) => (
    <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
      <ErrorMessage {...args} />
      <p className='text-xs text-gray-500 mt-2'>
        Error message adapts to container width
      </p>
    </div>
  ),
  args: {
    message:
      'This error message will adapt its width based on the screen size and container constraints.',
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const CustomStyling: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <ErrorMessage
        {...args}
        className='border-red-200 bg-red-50 text-red-800'
      />
      <ErrorMessage
        {...args}
        className='border-orange-200 bg-orange-50 text-orange-800'
      />
      <ErrorMessage
        {...args}
        className='border-yellow-200 bg-yellow-50 text-yellow-800'
      />
    </div>
  ),
  args: {
    message: 'Custom styled error message',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div className='flex items-center gap-2 p-4 border border-red-200 bg-red-50 rounded-lg'>
      <svg
        className='w-5 h-5 text-red-600 flex-shrink-0'
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path
          fillRule='evenodd'
          d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
          clipRule='evenodd'
        />
      </svg>
      <span className='text-red-800'>{args.message}</span>
    </div>
  ),
  args: {
    message: 'Error with custom icon styling',
  },
};
