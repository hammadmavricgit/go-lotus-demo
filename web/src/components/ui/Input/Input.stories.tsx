import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form input component with label support, error states, and consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Text label displayed above the input field',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text for the input',
      control: 'text',
    },
    type: {
      description: 'HTML input type',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    required: {
      description: 'Whether the field is required (shows red asterisk)',
      control: 'boolean',
    },
    error: {
      description: 'Whether to show error styling (red border)',
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the input is disabled',
      control: 'boolean',
    },
    value: {
      description: 'Current value of the input',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
  },
};

// Error state
export const Error: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: true,
    placeholder: 'Enter your password',
  },
};

// Different input types
export const TextType: Story = {
  args: {
    label: 'Text Input',
    type: 'text',
    placeholder: 'Enter text',
  },
};

export const EmailType: Story = {
  args: {
    label: 'Email Input',
    type: 'email',
    placeholder: 'Enter email address',
  },
};

export const PasswordType: Story = {
  args: {
    label: 'Password Input',
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const NumberType: Story = {
  args: {
    label: 'Number Input',
    type: 'number',
    placeholder: 'Enter number',
  },
};

export const TelType: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter phone number',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

// With value
export const WithValue: Story = {
  args: {
    label: 'Input with Value',
    value: 'Pre-filled text',
    placeholder: 'Enter text',
  },
};

// Error with required
export const ErrorAndRequired: Story = {
  args: {
    label: 'Required Field with Error',
    required: true,
    error: true,
    placeholder: 'This field has an error',
  },
};

// All states comparison
export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-md'>
      <Input label='Default Input' placeholder='Default state' />
      <Input label='Required Input' required placeholder='Required field' />
      <Input label='Error Input' error placeholder='Error state' />
      <Input label='Disabled Input' disabled placeholder='Disabled state' />
      <Input
        label='Required + Error'
        required
        error
        placeholder='Required with error'
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input states for comparison.',
      },
    },
  },
};

// Different input types comparison
export const InputTypes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-full max-w-md'>
      <Input label='Text' type='text' placeholder='Text input' />
      <Input label='Email' type='email' placeholder='Email input' />
      <Input label='Password' type='password' placeholder='Password input' />
      <Input label='Number' type='number' placeholder='Number input' />
      <Input label='Phone' type='tel' placeholder='Phone number' />
      <Input label='URL' type='url' placeholder='Website URL' />
      <Input label='Search' type='search' placeholder='Search...' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different HTML input types supported by the component.',
      },
    },
  },
};

// Responsive example
export const Responsive: Story = {
  args: {
    label: 'Responsive Input',
    placeholder: 'This input adapts to screen size',
    containerClassName: 'w-full max-w-md',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};
