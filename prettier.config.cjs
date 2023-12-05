// prettier.config.cjs, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
module.exports = {
    printWidth: 120,
    semi: false,
    bracketSameLine: true,
    trailingComma: 'es5',
    tabWidth: 4,
    singleQuote: true,
    bracketSpacing: false,
    arrowParens: 'always',
    singleAttributePerLine: true,
    plugins: ['prettier-plugin-tailwindcss'],
}
