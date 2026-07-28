import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default defineConfig(
  eslint.configs.recommended,
  eslintConfigPrettier,
  {
    // source files only, generated output excluded so a full-repo run stays fast
    ignores: ['**/dist/', '**/build/', '**/node_modules/', '**/coverage/', '**/*.min.{js,mjs,cjs}', '**/*.bundle.js'],
  },
  {
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      curly: ['error', 'all'],
      'no-nested-ternary': 'error',
      // none of this `;(expr).method()`. semi: 'never' rules out trailing
      // `;`, semi-style: 'last' rules out leading `;`. together they force a
      // restructure (extract temp, fix the underlying cast, etc.) rather than
      // letting a defender semi slip in
      semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
      'semi-style': ['error', 'last'],
      'no-extra-semi': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: { react, 'react-hooks': reactHooks },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        // file drop + tests
        File: 'readonly',
        FileReader: 'readonly',
        Node: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'warn',
    },
    settings: { react: { version: 'detect' } },
  },
)
