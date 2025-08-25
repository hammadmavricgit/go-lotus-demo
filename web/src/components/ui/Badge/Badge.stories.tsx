import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Visual style variant of the badge',
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
    children: 'Default Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Badge',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Badge',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Badge',
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='default'>Active</Badge>
      <Badge variant='secondary'>Pending</Badge>
      <Badge variant='destructive'>Inactive</Badge>
      <Badge variant='outline'>Archived</Badge>
    </div>
  ),
};

export const StaffStatus: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <span className='text-sm'>Current Staff:</span>
        <Badge variant='default'>Active</Badge>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm'>Former Staff:</span>
        <Badge variant='outline'>Archived</Badge>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm'>Suspended:</span>
        <Badge variant='destructive'>Inactive</Badge>
      </div>
    </div>
  ),
};

export const RoleBadges: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='default'>Admin</Badge>
      <Badge variant='secondary'>Physiotherapist</Badge>
      <Badge variant='outline'>Receptionist</Badge>
      <Badge variant='secondary'>Nurse</Badge>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        <Badge
          variant='default'
          className='cursor-pointer hover:bg-blue-600 transition-colors'
        >
          Clickable Badge
        </Badge>
        <Badge
          variant='secondary'
          className='cursor-pointer hover:bg-gray-600 transition-colors'
        >
          Hover Effect
        </Badge>
      </div>
      <p className='text-sm text-gray-600'>
        Badges can be made interactive with hover effects and click handlers.
      </p>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        <Badge className='text-xs sm:text-sm'>Small on Mobile</Badge>
        <Badge variant='secondary' className='text-xs sm:text-sm'>
          Responsive Text
        </Badge>
      </div>
      <p className='text-sm text-gray-600'>
        Badge text size adapts to screen size for better mobile experience.
      </p>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
