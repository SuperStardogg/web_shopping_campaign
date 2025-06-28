import path from 'node:path'
import { fileURLToPath } from 'node:url'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import _import from 'eslint-plugin-import'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import parser from 'vue-eslint-parser'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/pnpm-lock.yaml', '!**/.*'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        jest: 'readonly',
      },

      parser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser',
        jsxPragma: 'React',

        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
    },

    rules: {
      'no-console': [
        'warn',
        {
          allow: ['error'],
        },
      ],

      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],

      camelcase: [
        'error',
        {
          properties: 'never',
        },
      ],

      'no-var': 'error',

      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],

      'no-void': 'error',

      'prefer-const': [
        'warn',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        },
      ],

      'prefer-template': 'error',

      'object-shorthand': [
        'error',
        'always',
        {
          ignoreConstructors: false,
          avoidQuotes: true,
        },
      ],

      'no-useless-rename': 'warn',

      'block-scoped-var': 'error',

      'no-constant-condition': [
        'error',
        {
          checkLoops: false,
        },
      ],

      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
        },
      ],

      '@typescript-eslint/no-this-alias': [
        'error',
        {
          allowDestructuring: true,
          allowedNames: ['self'],
        },
      ],

      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],

          pathGroups: [
            {
              pattern: 'vue',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@vue/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@element-plus/**',
              group: 'internal',
            },
          ],

          pathGroupsExcludedImportTypes: ['type'],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.vue'],

    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['**/__tests__/**', '**/gulpfile.ts'],

    rules: {
      'no-console': 'off',
      'vue/one-component-per-file': 'off',
    },
  },
]
