import { preset } from '../../../design-system/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [preset],
  prefix: "shell-", // Unique prefix for the shell                                                                                                         │
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    '../design-system/src/**/*.{ts,tsx,js,jsx,css}',
  ],
};

export default config;