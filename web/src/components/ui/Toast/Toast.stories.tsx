import type { Meta, StoryObj } from '@storybook/react';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Notification</ToastTitle>
      <ToastDescription>This is a default toast notification.</ToastDescription>
    </Toast>
  ),
};

export const Success: Story = {
  render: () => (
    <Toast className='border-green-200 bg-green-50'>
      <ToastTitle className='text-green-800'>Success</ToastTitle>
      <ToastDescription className='text-green-700'>
        Staff member has been successfully added to the system.
      </ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const Error: Story = {
  render: () => (
    <Toast className='border-red-200 bg-red-50'>
      <ToastTitle className='text-red-800'>Error</ToastTitle>
      <ToastDescription className='text-red-700'>
        Failed to save staff information. Please try again.
      </ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const Warning: Story = {
  render: () => (
    <Toast className='border-yellow-200 bg-yellow-50'>
      <ToastTitle className='text-yellow-800'>Warning</ToastTitle>
      <ToastDescription className='text-yellow-700'>
        Some fields are missing. Please complete all required information.
      </ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const Info: Story = {
  render: () => (
    <Toast className='border-blue-200 bg-blue-50'>
      <ToastTitle className='text-blue-800'>Information</ToastTitle>
      <ToastDescription className='text-blue-700'>
        Your changes have been automatically saved.
      </ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Staff Invitation</ToastTitle>
      <ToastDescription>
        Invitation sent successfully to john.doe@example.com
      </ToastDescription>
      <ToastAction altText='Resend invitation'>Resend</ToastAction>
      <ToastClose />
    </Toast>
  ),
};

export const LongMessage: Story = {
  render: () => (
    <Toast>
      <ToastTitle>System Update</ToastTitle>
      <ToastDescription>
        The system has been updated with new features including enhanced staff
        management, improved reporting capabilities, and better user interface.
        All your data has been preserved and the system is now running on the
        latest version.
      </ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const StaffCreated: Story = {
  render: () => (
    <Toast className='border-green-200 bg-green-50'>
      <ToastTitle className='text-green-800'>Staff Created</ToastTitle>
      <ToastDescription className='text-green-700'>
        John Doe has been successfully added as a Physiotherapist.
      </ToastDescription>
      <ToastAction altText='View profile'>View Profile</ToastAction>
      <ToastClose />
    </Toast>
  ),
};

export const ProfileUpdated: Story = {
  render: () => (
    <Toast className='border-blue-200 bg-blue-50'>
      <ToastTitle className='text-blue-800'>Profile Updated</ToastTitle>
      <ToastDescription className='text-blue-700'>
        Staff profile information has been successfully updated.
      </ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const InvitationSent: Story = {
  render: () => (
    <Toast className='border-green-200 bg-green-50'>
      <ToastTitle className='text-green-800'>Invitation Sent</ToastTitle>
      <ToastDescription className='text-green-700'>
        Staff invitation has been sent to the provided email address.
      </ToastDescription>
      <ToastAction altText='Send another'>Send Another</ToastAction>
      <ToastClose />
    </Toast>
  ),
};

export const ValidationError: Story = {
  render: () => (
    <Toast className='border-red-200 bg-red-50'>
      <ToastTitle className='text-red-800'>Validation Error</ToastTitle>
      <ToastDescription className='text-red-700'>
        Please fill in all required fields: Email, First Name, and Last Name.
      </ToastDescription>
      <ToastAction altText='Fix errors'>Fix Errors</ToastAction>
      <ToastClose />
    </Toast>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <div className='space-y-4'>
      <Toast className='border-green-200 bg-green-50'>
        <ToastTitle className='text-green-800'>Success</ToastTitle>
        <ToastDescription className='text-green-700'>
          Staff member added successfully.
        </ToastDescription>
        <ToastClose />
      </Toast>
      <Toast className='border-blue-200 bg-blue-50'>
        <ToastTitle className='text-blue-800'>Info</ToastTitle>
        <ToastDescription className='text-blue-700'>
          System maintenance scheduled for tonight.
        </ToastDescription>
        <ToastClose />
      </Toast>
      <Toast className='border-yellow-200 bg-yellow-50'>
        <ToastTitle className='text-yellow-800'>Warning</ToastTitle>
        <ToastDescription className='text-yellow-700'>
          Some data may be temporarily unavailable.
        </ToastDescription>
        <ToastClose />
      </Toast>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
      <Toast>
        <ToastTitle>Responsive Toast</ToastTitle>
        <ToastDescription>
          This toast adapts its width based on screen size and container
          constraints.
        </ToastDescription>
        <ToastClose />
      </Toast>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
