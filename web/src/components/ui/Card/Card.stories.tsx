import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p>This is a basic card with content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card has a header with a title.</p>
      </CardContent>
    </Card>
  ),
};

export const StaffProfileCard: Story = {
  render: (args) => (
    <Card {...args} className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Staff Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 bg-gray-200 rounded-full'></div>
            <div>
              <h3 className='font-semibold'>John Doe</h3>
              <p className='text-sm text-gray-600'>Physiotherapist</p>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Email:</span>
              <span className='text-sm'>john.doe@example.com</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-gray-600'>Phone:</span>
              <span className='text-sm'>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ClinicInfoCard: Story = {
  render: (args) => (
    <Card {...args} className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Clinic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <div>
            <label className='text-sm font-medium text-gray-700'>
              Clinic Name
            </label>
            <p className='text-sm'>Downtown Physiotherapy Clinic</p>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>Address</label>
            <p className='text-sm'>123 Main Street, Suite 100</p>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700'>Phone</label>
            <p className='text-sm'>+1 (555) 987-6543</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const HoursCard: Story = {
  render: (args) => (
    <Card {...args} className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Working Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-sm'>Monday - Friday</span>
            <span className='text-sm font-medium'>9:00 AM - 6:00 PM</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm'>Saturday</span>
            <span className='text-sm font-medium'>10:00 AM - 4:00 PM</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm'>Sunday</span>
            <span className='text-sm font-medium'>Closed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const Responsive: Story = {
  render: (args) => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card adapts to different screen sizes.</p>
        </CardContent>
      </Card>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Cards stack on mobile and display in a grid on larger screens.</p>
        </CardContent>
      </Card>
      <Card {...args}>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Responsive design ensures good UX across all devices.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
