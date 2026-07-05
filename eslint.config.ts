import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import markdown from '@eslint/markdown'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import betterTailwindcssPlugin from 'eslint-plugin-better-tailwindcss'

export default defineConfig([
  {
    ignores: ['.content-collections/**', 'dist/**'],
  },
  {
    files: ['src/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    plugins: {
      'better-tailwindcss': betterTailwindcssPlugin,
      react: pluginReact,
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...betterTailwindcssPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'warn',
        { printWidth: 90, preferSingleLine: true },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-require-imports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-console': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unsafe-optional-chaining': 'warn',
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/styles.css',
      },
      // react: {
      //   version: 'detect',
      // },
    },
  },
  ...markdown.configs.recommended,
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    ignores: ['src/app/styles.css'],
    rules: {
      ...css.configs.recommended.rules,
      'css/use-baseline': 'off',
    },
  },
])
