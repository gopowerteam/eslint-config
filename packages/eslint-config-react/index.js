module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    '@gopowerteam/eslint-config-ts',
  ],
  settings: { react: { version: '17.0' } },
  rules: {
    // eslint规则：在 JSX 属性中强制使用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // eslint规则：禁止导入“react”但未使用它，因为 React 17 不再需要显式导入“React”对象
    'react/react-in-jsx-scope': 'off',
  },
}
