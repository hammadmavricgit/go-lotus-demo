import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../src/components/ui/Badge/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/Button/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/Card/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/Dilaog/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/ErrorMessage/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/GenericTable/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/Input/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/LoadingSpinner/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/Select/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/Tabs/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/Toast/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/ui/Toaster/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
};
export default config;
