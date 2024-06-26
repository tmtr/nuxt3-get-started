// @ts-check
import stylistic from '@stylistic/eslint-plugin'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: [
      '**/*.?(c,m)js',
      '**/*.ts?(x)',
      '**/*.vue'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
      '@typescript-eslint/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        }
      }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require'
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        // REF: https://typescript-eslint.io/rules/naming-convention/#ignore-properties-that-require-quotes
        {
          selector: 'objectLiteralProperty',
          modifiers: ['requiresQuotes'],
          format: null
        }
      ],
      '@typescript-eslint/no-empty-interface': 'off'
    }
  },
  {
    files: [
      '**/*.vue'
    ],
    rules: {
      'vue/require-v-for-key': 'off'
    }
  },
  stylistic.configs.customize({
    flat: true,
    braceStyle: '1tbs',
    commaDangle: 'never'
  })
)
