module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    semi: [
      'warn',
      'always'
    ],
    'comma-dangle': [
      'warn',
      'always-multiline'
    ],
    quotes: [
      'warn',
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    '@typescript-eslint/indent': [
      'warn',
      2
    ],
  },
  overrides: [
    {
      files: [
        "jest.config.js",
        "jest.e2e-config.js",
      ],
      env: {
        node: true,
      },
    },
    {
      files: [
        "**/*.test.ts",
        "**/*.e2e-test.ts",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
