module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Add node environment
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', // Add typescript-eslint recommended rules
  ],
  parser: '@typescript-eslint/parser', // Add typescript-eslint parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'react-refresh', '@typescript-eslint'], // Add typescript-eslint plugin
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off',
    'no-unused-vars': 'off', // Disable the base rule as the @typescript-eslint rule is used
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
