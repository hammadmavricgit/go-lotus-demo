import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from './Dialog';
import { Button } from '../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal dialog component built on top of Radix UI with full accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls the open state of the dialog',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Dialog Story
export const Default: Story = {
  render: (args: any) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <label htmlFor='name' className='text-right'>
              Name
            </label>
            <input
              id='name'
              defaultValue='Pedro Duarte'
              className='col-span-3 rounded-md border px-3 py-2'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <label htmlFor='username' className='text-right'>
              Username
            </label>
            <input
              id='username'
              defaultValue='@peduarte'
              className='col-span-3 rounded-md border px-3 py-2'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Confirmation Dialog Story
export const Confirmation: Story = {
  render: (args: any) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary'>Cancel</Button>
          </DialogClose>
          <Button variant='primary'>Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form Dialog Story
export const Form: Story = {
  render: (args: any) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    };

    return (
      <Dialog {...args}>
        <DialogTrigger asChild>
          <Button>Create New Project</Button>
        </DialogTrigger>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new project.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='title' className='text-sm font-medium'>
                Project Title
              </label>
              <input
                id='title'
                type='text'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className='w-full rounded-md border px-3 py-2'
                placeholder='Enter project title'
                required
              />
            </div>
            <div className='space-y-2'>
              <label htmlFor='description' className='text-sm font-medium'>
                Description
              </label>
              <textarea
                id='description'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className='w-full rounded-md border px-3 py-2'
                placeholder='Enter project description'
                rows={3}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit'>Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  },
};

// Alert Dialog Story
export const Alert: Story = {
  render: (args: any) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Show Alert</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Important Notice</DialogTitle>
          <DialogDescription>
            This is an important message that requires your attention.
          </DialogDescription>
        </DialogHeader>
        <div className='bg-yellow-50 border border-yellow-200 rounded-md p-4'>
          <p className='text-yellow-800 text-sm'>
            ⚠️ Please review the information above before proceeding.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Custom Close Button Story
export const CustomClose: Story = {
  render: (args: any) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Open with Custom Close</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Close Button</DialogTitle>
          <DialogDescription>
            This dialog uses a custom close button instead of the default X.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <p>Content goes here...</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary'>Close Dialog</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Large Content Dialog Story
export const LargeContent: Story = {
  render: (args: any) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant='secondary'>View Details</Button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
          <DialogDescription>
            Comprehensive view of the project information and requirements.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-6 py-4'>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Overview</h3>
            <p className='text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Requirements</h3>
            <ul className='list-disc list-inside space-y-1 text-gray-600'>
              <li>Responsive design implementation</li>
              <li>Accessibility compliance</li>
              <li>Performance optimization</li>
              <li>Cross-browser compatibility</li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Timeline</h3>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='font-medium'>Start Date:</span> January 15,
                2024
              </div>
              <div>
                <span className='font-medium'>End Date:</span> March 30, 2024
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='secondary'>Close</Button>
          </DialogClose>
          <Button>Edit Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Controlled Dialog Story
export const Controlled: Story = {
  render: (args: any) => {
    const [open, setOpen] = useState(false);

    return (
      <div className='space-y-4'>
        <div className='flex gap-2'>
          <Button onClick={() => setOpen(true)}>Open Dialog</Button>
          <Button variant='secondary' onClick={() => setOpen(false)}>
            Close Dialog
          </Button>
        </div>
        <Dialog open={open} onOpenChange={setOpen} {...args}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog is controlled by external state.
              </DialogDescription>
            </DialogHeader>
            <div className='py-4'>
              <p>Current state: {open ? 'Open' : 'Closed'}</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
