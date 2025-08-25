import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import {
  Settings,
  User,
  Bell,
  BarChart3,
  FileText,
  Activity,
} from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tabbed interface component built on top of Radix UI with full accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default active tab value',
    },
    value: {
      control: 'text',
      description: 'The currently active tab value (for controlled usage)',
    },
    onValueChange: {
      action: 'tab changed',
      description: 'Callback when tab selection changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Tabs Story
export const Default: Story = {
  args: {
    defaultValue: 'account',
  },
  render: (args) => (
    <Tabs {...args} className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
        <TabsTrigger value='notifications'>Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value='account' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Account Settings</h3>
          <p className='text-sm text-gray-600'>
            Manage your account settings and preferences here. You can update
            your profile information, change your email, and configure account
            security.
          </p>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Email</label>
            <input
              type='email'
              defaultValue='user@example.com'
              className='w-full rounded-md border px-3 py-2 text-sm'
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value='password' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Password Settings</h3>
          <p className='text-sm text-gray-600'>
            Change your password and configure password security settings.
          </p>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Current Password</label>
            <input
              type='password'
              className='w-full rounded-md border px-3 py-2 text-sm'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm font-medium'>New Password</label>
            <input
              type='password'
              className='w-full rounded-md border px-3 py-2 text-sm'
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value='notifications' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Notification Preferences</h3>
          <p className='text-sm text-gray-600'>
            Configure how and when you receive notifications.
          </p>
          <div className='space-y-3'>
            <label className='flex items-center space-x-2'>
              <input type='checkbox' defaultChecked />
              <span className='text-sm'>Email notifications</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input type='checkbox' defaultChecked />
              <span className='text-sm'>Push notifications</span>
            </label>
            <label className='flex items-center space-x-2'>
              <input type='checkbox' />
              <span className='text-sm'>SMS notifications</span>
            </label>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// Controlled Tabs Story
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
      <div className='space-y-4'>
        <div className='text-sm text-gray-600'>
          Current active tab: <span className='font-medium'>{activeTab}</span>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-[500px]'
        >
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='analytics'>Analytics</TabsTrigger>
            <TabsTrigger value='reports'>Reports</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='mt-6'>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Dashboard Overview</h3>
              <p className='text-sm text-gray-600'>
                Get a quick overview of your key metrics and recent activity.
              </p>
              <div className='grid grid-cols-2 gap-4'>
                <div className='rounded-lg border p-4'>
                  <div className='text-2xl font-bold text-blue-600'>1,234</div>
                  <div className='text-sm text-gray-600'>Total Users</div>
                </div>
                <div className='rounded-lg border p-4'>
                  <div className='text-2xl font-bold text-green-600'>89%</div>
                  <div className='text-sm text-gray-600'>Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='analytics' className='mt-6'>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Analytics Dashboard</h3>
              <p className='text-sm text-gray-600'>
                Detailed analytics and performance metrics.
              </p>
              <div className='h-32 rounded-lg border bg-gray-50 flex items-center justify-center'>
                <p className='text-gray-500'>Analytics Chart Placeholder</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='reports' className='mt-6'>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Reports & Insights</h3>
              <p className='text-sm text-gray-600'>
                Generate and view detailed reports.
              </p>
              <div className='space-y-2'>
                <button className='w-full rounded-lg border p-3 text-left hover:bg-gray-50'>
                  <div className='font-medium'>Monthly Performance Report</div>
                  <div className='text-sm text-gray-600'>
                    Generated 2 days ago
                  </div>
                </button>
                <button className='w-full rounded-lg border p-3 text-left hover:bg-gray-50'>
                  <div className='font-medium'>User Engagement Analysis</div>
                  <div className='text-sm text-gray-600'>
                    Generated 1 week ago
                  </div>
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled tabs with external state management and dynamic content.',
      },
    },
  },
};

// Tabs with Icons Story
export const WithIcons: Story = {
  args: {
    defaultValue: 'settings',
  },
  render: (args) => (
    <Tabs {...args} className='w-[450px]'>
      <TabsList>
        <TabsTrigger value='settings' className='flex items-center gap-2'>
          <Settings className='h-4 w-4' />
          Settings
        </TabsTrigger>
        <TabsTrigger value='profile' className='flex items-center gap-2'>
          <User className='h-4 w-4' />
          Profile
        </TabsTrigger>
        <TabsTrigger value='notifications' className='flex items-center gap-2'>
          <Bell className='h-4 w-4' />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value='settings' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold flex items-center gap-2'>
            <Settings className='h-5 w-5' />
            Settings
          </h3>
          <p className='text-sm text-gray-600'>
            Configure your application settings and preferences.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='profile' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold flex items-center gap-2'>
            <User className='h-5 w-5' />
            Profile
          </h3>
          <p className='text-sm text-gray-600'>
            Manage your personal profile information.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='notifications' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold flex items-center gap-2'>
            <Bell className='h-5 w-5' />
            Notifications
          </h3>
          <p className='text-sm text-gray-600'>
            Control your notification preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with icons for better visual identification.',
      },
    },
  },
};

// Vertical Tabs Story
export const Vertical: Story = {
  args: {
    defaultValue: 'dashboard',
  },
  render: (args) => (
    <Tabs {...args} className='w-[600px]' orientation='vertical'>
      <TabsList className='h-auto w-48 flex-col items-start'>
        <TabsTrigger value='dashboard' className='w-full justify-start'>
          <BarChart3 className='mr-2 h-4 w-4' />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value='analytics' className='w-full justify-start'>
          <Activity className='mr-2 h-4 w-4' />
          Analytics
        </TabsTrigger>
        <TabsTrigger value='reports' className='w-full justify-start'>
          <FileText className='mr-2 h-4 w-4' />
          Reports
        </TabsTrigger>
      </TabsList>
      <TabsContent value='dashboard' className='ml-6 mt-0'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Dashboard</h3>
          <p className='text-sm text-gray-600'>
            Your main dashboard with key metrics and insights.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='analytics' className='ml-6 mt-0'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Analytics</h3>
          <p className='text-sm text-gray-600'>
            Detailed analytics and performance data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='reports' className='ml-6 mt-0'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Reports</h3>
          <p className='text-sm text-gray-600'>
            Generate and view comprehensive reports.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical tabs layout for sidebar navigation patterns.',
      },
    },
  },
};

// Disabled Tabs Story
export const Disabled: Story = {
  args: {
    defaultValue: 'active',
  },
  render: (args) => (
    <Tabs {...args} className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='active'>Active Tab</TabsTrigger>
        <TabsTrigger value='disabled' disabled>
          Disabled Tab
        </TabsTrigger>
        <TabsTrigger value='another'>Another Tab</TabsTrigger>
      </TabsList>
      <TabsContent value='active' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Active Tab</h3>
          <p className='text-sm text-gray-600'>
            This tab is active and fully functional.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='disabled' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Disabled Tab</h3>
          <p className='text-sm text-gray-600'>
            This content is not accessible because the tab is disabled.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='another' className='mt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Another Tab</h3>
          <p className='text-sm text-gray-600'>
            This is another active tab with content.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with disabled state for conditional access.',
      },
    },
  },
};

// Custom Styling Story
export const CustomStyling: Story = {
  args: {
    defaultValue: 'custom',
  },
  render: (args) => (
    <Tabs {...args} className='w-[500px]'>
      <TabsList className='bg-gradient-to-r from-blue-500 to-purple-500 p-1'>
        <TabsTrigger
          value='custom'
          className='data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg'
        >
          Custom Style
        </TabsTrigger>
        <TabsTrigger
          value='gradient'
          className='data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg'
        >
          Gradient
        </TabsTrigger>
        <TabsTrigger
          value='modern'
          className='data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-lg'
        >
          Modern
        </TabsTrigger>
      </TabsList>
      <TabsContent value='custom' className='mt-6'>
        <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
          <h3 className='text-lg font-semibold text-blue-800'>
            Custom Styling
          </h3>
          <p className='text-sm text-blue-700'>
            This tab demonstrates custom styling with gradients and modern
            design.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='gradient' className='mt-6'>
        <div className='rounded-lg border border-purple-200 bg-purple-50 p-4'>
          <h3 className='text-lg font-semibold text-purple-800'>
            Gradient Design
          </h3>
          <p className='text-sm text-purple-700'>
            Beautiful gradient backgrounds and custom color schemes.
          </p>
        </div>
      </TabsContent>
      <TabsContent value='modern' className='mt-6'>
        <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
          <h3 className='text-lg font-semibold text-gray-800'>Modern Look</h3>
          <p className='text-sm text-gray-700'>
            Clean, modern design with subtle shadows and borders.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with custom styling and gradient backgrounds.',
      },
    },
  },
};
