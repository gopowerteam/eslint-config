# @gopowerteam/eslint-config

ESLint config for JavaScript, TypeScript, Vue 2, Vue 3, Prettier.

## Usage

```bash
pnpm i -D @gopowerteam/eslint-config-basic # JavaScript only
pnpm i -D @gopowerteam/eslint-config-ts # JavaScript and TypeScript
pnpm i -D @gopowerteam/eslint-config-vue # JavaScript, TypeScript and Vue 2/3 (Auto detect)
pnpm i -D @gopowerteam/eslint-config-prettier # Prettier only
pnpm i -D @gopowerteam/eslint-config # JavaScript, TypeScript, Vue 2/3 and Prettier
```

## Quick start

### Vue 3

```bash
pnpm i -D @gopowerteam/eslint-config
```

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  extends: ['@gopowerteam/eslint-config'],
  rules: {
    // Your custom rules
  },
}
```

```jsonc
// .prettierrc
{
  "semi": false,
  "singleQuote": true
}
```

### VSCode

```jsonc
// settings.json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "vue",
    "json",
    "json5",
    "jsonc",
    "yaml"
  ],
  "eslint.probe": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html",
    "vue",
    "json",
    "json5",
    "jsonc",
    "yaml"
  ]
}
```
