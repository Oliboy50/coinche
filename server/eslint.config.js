const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');

module.exports = tseslint.config(
  {
    ignores: ['node_modules/**', 'build/**', 'coverage/**', 'eslint.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
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
    files: ['**/*.{test,e2e-test}.ts', 'jest.e2e-config.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
);
