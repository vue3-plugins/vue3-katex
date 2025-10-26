import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// This gitignore setup is correct and still best practice
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
  // 1. Add ignore rules first
  includeIgnoreFile(gitignorePath),

  ...pluginVue.configs['flat/recommended'],
  // 2. Apply Vue recommended rules to Vue files
  // We move the `files` glob *inside* the config
  {
    files: ['**/*.vue'],
    // Add your rule overrides for *only* Vue files here
    rules: {
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/max-attributes-per-line': 'off',
      // ... other vue-specific rules
    },
  },

  // 3. Apply general JavaScript rules
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

