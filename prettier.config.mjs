const config = {
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  endOfLine: 'auto',
  trailingComma: 'es5',
  importOrder: ['^[./]'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
}

export default config
