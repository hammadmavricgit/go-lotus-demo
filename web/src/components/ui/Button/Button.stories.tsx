import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable button component with primary and secondary variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style variant of the button',
      control: 'select',
      options: ['primary', 'secondary'],
    },
    children: {
      description: 'Content to display inside the button',
      control: 'text',
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
    },
    onClick: {
      description: 'Click handler function',
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// Primary disabled
export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Disabled',
    disabled: true,
  },
};

// Secondary disabled
export const SecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Disabled',
    disabled: true,
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    variant: 'primary',
    children: 'Click Me!',
    onClick: () => alert('Button clicked!'),
  },
};

// With custom styling
export const CustomStyling: Story = {
  args: {
    variant: 'primary',
    children: 'Custom Button',
    className: 'w-full px-8 py-3 text-lg',
  },
};

// Long text
export const LongText: Story = {
  args: {
    variant: 'primary',
    children: 'This is a button with very long text content',
  },
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <Button variant='primary'>Primary Button</Button>
      <Button variant='secondary'>Secondary Button</Button>
      <Button variant='primary' disabled>
        Primary Disabled
      </Button>
      <Button variant='secondary' disabled>
        Secondary Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants and states for comparison.',
      },
    },
  },
};

// Responsive example
export const Responsive: Story = {
  args: {
    variant: 'primary',
    children: 'Responsive Button',
    className: 'w-full sm:w-auto',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};
