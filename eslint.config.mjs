import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  includeIgnoreFile(gitignorePath),

  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },

  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest', // 'latest' is preferred over a specific year
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser, // Good to add for most projects
      },
    },
    rules: {
      // ... add any JS-specific rules here
      // e.g., 'semi': ['error', 'always']
    },
  },
];

