const overrides = require('./config/eslint/overrides.cjs');
const rules = require('./config/eslint/rules.cjs');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: [
    '@typescript-eslint',
    'sonarjs',
    'astro',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:json/recommended',
    'plugin:sonarjs/recommended',
    'plugin:astro/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  overrides,
  rules,
};
