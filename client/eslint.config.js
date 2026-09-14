const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');

module.exports = tseslint.config(
  {
    ignores: ['node_modules/**', 'build/**', 'coverage/**', 'eslint.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      semi: ['warn', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      quotes: ['warn', 'single', { allowTemplateLiterals: true }],
      'no-case-declarations': 'off',
      'no-irregular-whitespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },
  {
    files: ['**/*.{test,spec}.{js,ts,tsx}', 'vite.config.mts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
        vi: 'readonly',
      },
    },
  },
);
