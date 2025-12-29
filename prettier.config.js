/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  arrowParens: 'avoid',
  singleQuote: true,
  semi: false,
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/hooks/(.*)$',
    '^@/components/(.*)$',
    '^@/lib/(.*)$',
    '^@/styles/(.*)$',
    '^[.]',
    '',
    '^~/*(.*)$',
    '',
  ],
  importOrderCaseSensitive: false,
  importOrderTypeScriptVersion: '5.9.3',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
}
