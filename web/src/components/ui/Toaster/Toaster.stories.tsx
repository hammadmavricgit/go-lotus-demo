import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toaster } from './Toaster';
import { Button } from '../Button/Button';
import { useToast } from '@/hooks/use-toast';

// Wrapper component to demonstrate toast functionality
function ToastDemo() {
  const { toast } = useToast();
  const [toastCount, setToastCount] = useState(0);

  const showSuccessToast = () => {
    setToastCount((prev) => prev + 1);
    toast({
      title: 'Success!',
      description: `Action completed successfully. Toast #${toastCount + 1}`,
    });
  };

  const showErrorToast = () => {
    setToastCount((prev) => prev + 1);
    toast({
      title: 'Error',
      description: `Something went wrong. Toast #${toastCount + 1}`,
      variant: 'destructive',
    });
  };

  const showInfoToast = () => {
    setToastCount((prev) => prev + 1);
    toast({
      title: 'Information',
      description: `Here's some useful information. Toast #${toastCount + 1}`,
    });
  };

  const showToastWithAction = () => {
    setToastCount((prev) => prev + 1);
    toast({
      title: 'Undo Action',
      description: `Your item was deleted. Toast #${toastCount + 1}`,
      action: (
        <Button variant='secondary' onClick={() => console.log('Undo clicked')}>
          Undo
        </Button>
      ),
    });
  };

  const showLongDurationToast = () => {
    setToastCount((prev) => prev + 1);
    toast({
      title: 'Long Duration Toast',
      description: `This toast will stay visible for 10 seconds. Toast #${
        toastCount + 1
      }`,
      duration: 10000,
    });
  };

  const showMultipleToasts = () => {
    // Show several toasts in quick succession
    toast({
      title: 'First Toast',
      description: 'This is the first toast notification.',
    });

    setTimeout(() => {
      toast({
        title: 'Second Toast',
        description: 'This is the second toast notification.',
      });
    }, 100);

    setTimeout(() => {
      toast({
        title: 'Third Toast',
        description: 'This is the third toast notification.',
        variant: 'destructive',
      });
    }, 200);
  };

  const clearAllToasts = () => {
    // This would typically be handled by the toast system
    // For demo purposes, we'll just show a message
    toast({
      title: 'Toasts Cleared',
      description: 'All toast notifications have been cleared.',
    });
  };

  return (
    <div className='space-y-4 p-6'>
      <div className='space-y-2'>
        <h2 className='text-lg font-semibold'>Toast Controls</h2>
        <p className='text-sm text-gray-600'>
          Click the buttons below to see different types of toast notifications.
          The Toaster component will appear at the bottom of the screen.
        </p>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <Button
          onClick={showSuccessToast}
          className='bg-green-600 hover:bg-green-700'
        >
          Show Success Toast
        </Button>

        <Button onClick={showErrorToast} variant='secondary'>
          Show Error Toast
        </Button>

        <Button onClick={showInfoToast} variant='secondary'>
          Show Info Toast
        </Button>

        <Button onClick={showToastWithAction} variant='secondary'>
          Show Toast with Action
        </Button>

        <Button onClick={showLongDurationToast} variant='secondary'>
          Show Long Duration Toast
        </Button>

        <Button onClick={showMultipleToasts} variant='secondary'>
          Show Multiple Toasts
        </Button>

        <Button
          onClick={clearAllToasts}
          variant='secondary'
          className='col-span-2'
        >
          Clear All Toasts
        </Button>
      </div>

      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h3 className='font-medium mb-2'>Toast Statistics</h3>
        <p className='text-sm text-gray-600'>
          Total toasts shown in this session: {toastCount}
        </p>
      </div>

      <Toaster />
    </div>
  );
}

const meta: Meta<typeof Toaster> = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A toast notification system that displays temporary messages to users. Works with the useToast hook to manage toast state.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='min-h-screen bg-white'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Main demo story
export const Default: Story = {
  render: () => <ToastDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing all toast variants and features. Click the buttons to see different types of toast notifications.',
      },
    },
  },
};

// Simple toast story
export const SimpleToast: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className='p-6 space-y-4'>
        <Button
          onClick={() =>
            toast({ title: 'Hello', description: 'This is a simple toast!' })
          }
        >
          Show Simple Toast
        </Button>
        <Toaster />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic toast notification with just title and description.',
      },
    },
  },
};

// Toast with action story
export const ToastWithAction: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className='p-6 space-y-4'>
        <Button
          onClick={() =>
            toast({
              title: 'Item Deleted',
              description: 'Your item has been moved to the trash.',
              action: (
                <Button
                  variant='secondary'
                  onClick={() => console.log('Restore clicked')}
                >
                  Restore
                </Button>
              ),
            })
          }
        >
          Show Toast with Action
        </Button>
        <Toaster />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast notification with an action button for user interaction.',
      },
    },
  },
};

// Error toast story
export const ErrorToast: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className='p-6 space-y-4'>
        <Button
          variant='secondary'
          onClick={() =>
            toast({
              title: 'Error',
              description: 'Something went wrong. Please try again.',
              variant: 'destructive',
            })
          }
        >
          Show Error Toast
        </Button>
        <Toaster />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Destructive variant toast for error messages.',
      },
    },
  },
};

// Multiple toasts story
export const MultipleToasts: Story = {
  render: () => {
    const { toast } = useToast();

    const showMultiple = () => {
      toast({ title: 'First', description: 'First toast notification' });
      setTimeout(() => {
        toast({ title: 'Second', description: 'Second toast notification' });
      }, 500);
      setTimeout(() => {
        toast({ title: 'Third', description: 'Third toast notification' });
      }, 1000);
    };

    return (
      <div className='p-6 space-y-4'>
        <Button onClick={showMultiple}>Show Multiple Toasts</Button>
        <Toaster />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how multiple toasts stack and display simultaneously.',
      },
    },
  },
};

// Custom duration story
export const CustomDuration: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className='p-6 space-y-4'>
        <div className='space-y-2'>
          <Button
            onClick={() =>
              toast({
                title: 'Quick Toast',
                description: 'This toast disappears quickly (2 seconds)',
                duration: 2000,
              })
            }
          >
            Show Quick Toast (2s)
          </Button>
        </div>

        <div className='space-y-2'>
          <Button
            onClick={() =>
              toast({
                title: 'Long Toast',
                description: 'This toast stays visible longer (10 seconds)',
                duration: 10000,
              })
            }
          >
            Show Long Toast (10s)
          </Button>
        </div>

        <Toaster />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toasts with custom duration settings for different use cases.',
      },
    },
  },
};
