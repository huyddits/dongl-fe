import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import prettierConfig from './prettier.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      '.env*',
      '*.config.js',
      '*.config.mjs',
      'public/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-void': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-dep': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { ignoreRestSiblings: true, caughtErrors: 'none' },
      ],
      'prettier/prettier': ['warn', prettierConfig],
    },
  },
]

export default eslintConfig
