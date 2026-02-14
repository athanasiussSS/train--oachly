import type { StorybookConfig } from '@storybook/vue3';
import { mergeConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import vue from '@vitejs/plugin-vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../app/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "staticDirs": ["../public"],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/vue3-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          '~': resolve(__dirname, '../app'),
          '@': resolve(__dirname, '../app'),
          '~~': resolve(__dirname, '..'),
          '@@': resolve(__dirname, '..')
        }
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: ''
          }
        }
      }
    });
  }
};
export default config;