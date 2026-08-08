import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // Pinned rather than 'detect': eslint-plugin-react's version sniffing
    // calls context.getFilename(), which ESLint 10 removed.
    settings: { react: { version: '19.2' } },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // The Sanity schema files export plain config objects, not components.
      'react/prop-types': 'off',
    },
  },
  {
    // Config files run in Node, not the browser.
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
]
