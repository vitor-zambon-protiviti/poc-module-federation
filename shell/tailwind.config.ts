import { preset } from '@protiviti/design-system';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [preset],
  prefix: "shell-", // Unique prefix for the shell                                                                                                         │
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',

  ],
};

export default config;