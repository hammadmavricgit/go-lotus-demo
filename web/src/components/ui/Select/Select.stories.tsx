import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'physiotherapist', label: 'Physiotherapist' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'therapist', label: 'Therapist' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived' },
];

export const Default: Story = {
  render: (args) => (
    <div className='w-64'>
      <Select {...args} options={roleOptions} />
    </div>
  ),
  args: {
    placeholder: 'Select a role...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className='w-64 space-y-2'>
      <label className='text-sm font-medium text-gray-700'>Staff Role</label>
      <Select {...args} options={roleOptions} />
    </div>
  ),
  args: {
    placeholder: 'Choose a role...',
  },
};

export const StatusSelect: Story = {
  render: (args) => (
    <div className='w-64 space-y-2'>
      <label className='text-sm font-medium text-gray-700'>Staff Status</label>
      <Select {...args} options={statusOptions} />
    </div>
  ),
  args: {
    placeholder: 'Select status...',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className='w-64 space-y-2'>
      <label className='text-sm font-medium text-gray-700'>
        Disabled Select
      </label>
      <Select {...args} options={roleOptions} />
    </div>
  ),
  args: {
    placeholder: 'This select is disabled',
    disabled: true,
  },
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <div className='w-64 space-y-2'>
      <label className='text-sm font-medium text-gray-700'>
        Default Selection
      </label>
      <Select {...args} options={roleOptions} />
    </div>
  ),
  args: {
    placeholder: 'Select a role...',
    defaultValue: 'physiotherapist',
  },
};

export const InvitationRoleSelect: Story = {
  render: (args) => (
    <div className='w-64 space-y-2'>
      <label className='text-sm font-medium text-gray-700'>
        Invite as Role
      </label>
      <Select
        {...args}
        options={[
          { value: 'physiotherapist', label: 'Physiotherapist' },
          { value: 'receptionist', label: 'Receptionist' },
          { value: 'nurse', label: 'Nurse' },
          { value: 'therapist', label: 'Therapist' },
        ]}
      />
    </div>
  ),
  args: {
    placeholder: 'Select role for invitation...',
  },
};

export const Responsive: Story = {
  render: (args) => (
    <div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
      <label className='text-sm font-medium text-gray-700'>
        Responsive Select
      </label>
      <Select {...args} options={roleOptions} />
      <p className='text-xs text-gray-500 mt-2'>
        This select adapts its width based on screen size.
      </p>
    </div>
  ),
  args: {
    placeholder: 'Select an option...',
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const MultipleSelects: Story = {
  render: (args) => (
    <div className='space-y-4'>
      <div className='w-64 space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Staff Role</label>
        <Select {...args} options={roleOptions} />
      </div>
      <div className='w-64 space-y-2'>
        <label className='text-sm font-medium text-gray-700'>Status</label>
        <Select {...args} options={statusOptions} />
      </div>
    </div>
  ),
  args: {
    placeholder: 'Select an option...',
  },
};
