const eslint = require('@eslint/js');
const pluginCypress = require('eslint-plugin-cypress');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'src/screenshots/**', 'src/videos/**', 'eslint.config.js', 'cypress.config.js'],
  },
  eslint.configs.recommended,
  pluginCypress.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      semi: ['warn', 'always'],
      'comma-dangle': ['warn', 'always-multiline'],
      quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    },
  },
];
