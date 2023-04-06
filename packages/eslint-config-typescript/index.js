const fs = require('node:fs')
const { join } = require('node:path')
const basic = require('@gopowerteam/eslint-config-basic')

const tsconfig = process.env.ESLINT_TSCONFIG || 'tsconfig.eslint.json'
module.exports = {
  extends: ['@gopowerteam/eslint-config-basic', 'plugin:import/typescript', 'plugin:@typescript-eslint/recommended'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },
  overrides: basic.overrides.concat(
    !fs.existsSync(join(process.cwd(), tsconfig))
      ? []
      : [
          {
            parserOptions: {
              tsconfigRootDir: process.cwd(),
              project: [tsconfig],
            },
            parser: '@typescript-eslint/parser',
            excludedFiles: ['**/*.md/*.*'],
            files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
            // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
            rules: {
              // eslint规则：允许使用 throw 字面量
              'no-throw-literal': 'off',
              // TypeScript 规则：禁止使用 throw 字面量，必须使用 Error 对象或其子类的实例
              '@typescript-eslint/no-throw-literal': 'error',
              // eslint规则：允许使用隐式 eval() 函数
              'no-implied-eval': 'off',
              // TypeScript 规则：禁止使用隐式 eval() 函数
              '@typescript-eslint/no-implied-eval': 'error',
              // eslint规则：允许使用点表示法访问对象属性
              'dot-notation': 'off',
              // TypeScript 规则：要求使用点表示法访问对象属性
              '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
              // TypeScript 规则：禁用未使用 await 的 Promise
              '@typescript-eslint/no-floating-promises': 'error',
              // TypeScript 规则：禁止 Promise 在 resolve 或 reject 语句中传入不合法的参数类型
              '@typescript-eslint/no-misused-promises': 'error',
              // TypeScript 规则：await 表达式的参数必须是 Thenable 类型的值
              '@typescript-eslint/await-thenable': 'error',
              // TypeScript 规则：禁止使用 for-in 循环遍历数组，应该使用 forEach() 或 for-of 循环
              '@typescript-eslint/no-for-in-array': 'error',
              // TypeScript 规则：禁止对类型断言进行不必要的使用
              '@typescript-eslint/no-unnecessary-type-assertion': 'error',
              // TypeScript 规则：禁止传递不安全的参数（例如 any）给函数
              '@typescript-eslint/no-unsafe-argument': 'error',
              // TypeScript 规则：禁止将未经检查的值分配给任何类型的变量
              '@typescript-eslint/no-unsafe-assignment': 'error',
              // TypeScript 规则：禁止调用可能具有不安全性的方法，比如 eval()、Function() 等等
              '@typescript-eslint/no-unsafe-call': 'error',
              // TypeScript 规则：禁止对可能为 null 或 undefined 的对象进行成员访问操作
              '@typescript-eslint/no-unsafe-member-access': 'error',
              // TypeScript 规则：禁止从函数返回可能为 null 或 undefined 的值
              '@typescript-eslint/no-unsafe-return': 'error',
              // eslint规则：async 函数可以没有 await 语句
              'require-await': 'off',
              // TypeScript 规则：要求 async 函数中必须存在 await 语句
              '@typescript-eslint/require-await': 'error',
              // TypeScript 规则：要求操作数与加号运算符之间使用模板字符串
              '@typescript-eslint/restrict-plus-operands': 'error',
              // TypeScript 规则：强制模板字面量的插值表达式中只包含标识符、属性访问和括号表达式
              '@typescript-eslint/restrict-template-expressions': 'error',
              // TypeScript 规则：强制使用 bind() 或箭头函数绑定 this
              '@typescript-eslint/unbound-method': 'error',
            },
          },
          {
            // https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
            files: ['**/__tests__/**/*.ts', '**/*.spec.ts', '**/*.test.ts'],
            plugins: ['jest'],
            rules: {
              // you should turn the original rule off *only* for test files
              // TypeScript 规则：禁用不绑定 this 的方法（类成员函数），但是，仅在测试文件中可以忽略此规则
              '@typescript-eslint/unbound-method': 'off',
              // Jest 规则：要求测试方法必须绑定 this
              'jest/unbound-method': 'error',
            },
          },
        ],
  ),
  rules: {
    // eslint规则：允许在 import 语句中使用命名导入
    'import/named': 'off',
    // TypeScript 规则：禁止使用特定类型的注释，例如 // @ts-ignore ，但可以添加描述信息
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    // TypeScript 规则：要求对象字面量和类的成员之间使用一致的分隔符
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
    // TypeScript 规则：强制在冒号前后使用一致的空格
    '@typescript-eslint/type-annotation-spacing': ['error', {}],
    // TypeScript 规则：要求导入的类型与使用的方式保持一致
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    // TypeScript 规则：要求使用一致的类型定义方式，比如 interface 或 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    // TypeScript 规则：推荐使用 @ts-expect-error 注释而不是 @ts-ignore
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    // Override JS
    // eslint规则：允许使用没必要的构造函数
    'no-useless-constructor': 'off',
    // eslint规则：缩进样式检查
    'indent': 'off',
    // TypeScript 规则：强制使用一致的缩进，2 个空格
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        // 忽略特定节点类型的缩进
        ignoredNodes: [
          'TemplateLiteral *',
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
          'TSTypeParameterInstantiation',
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
        ],
        offsetTernaryExpressions: true,
      },
    ],
    // eslint规则：允许重新声明变量
    'no-redeclare': 'off',
    // TypeScript 规则：禁止重新声明变量
    '@typescript-eslint/no-redeclare': 'error',
    // eslint规则：允许在定义前使用变量
    'no-use-before-define': 'off',
    // TypeScript 规则：不允许在定义前使用变量和函数，但可以在类中使用类成员
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
    // eslint规则：强制 if 语句和其他块状结构的大括号使用一致的空格
    'brace-style': 'off',
    // TypeScript 规则：要求 if 语句和其他块状结构使用 stroustrup 风格，且允许单行代码块
    '@typescript-eslint/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    // eslint规则：允许在对象字面量中使用拖尾逗号
    'comma-dangle': 'off',
    // TypeScript 规则：要求在对象字面量和数组中使用拖尾逗号
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    // eslint规则：允许在对象字面量的大括号内部不添加空格
    'object-curly-spacing': 'off',
    // TypeScript 规则：要求在对象字面量的大括号内部添加空格
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    // eslint规则：允许在语句结尾处不加分号
    'semi': 'off',
    // TypeScript 规则：要求在语句结尾处不加分号
    '@typescript-eslint/semi': ['error', 'never'],
    // eslint规则：允许使用单引号
    'quotes': 'off',
    // TypeScript 规则：使用单引号
    '@typescript-eslint/quotes': ['error', 'single'],
    // eslint规则：允许在语句块之前不添加空格
    'space-before-blocks': 'off',
    // TypeScript 规则：要求在语句块之前添加一个空格
    '@typescript-eslint/space-before-blocks': ['error', 'always'],
    // eslint规则：允许在函数括号内部不添加空格
    'space-before-function-paren': 'off',
    // TypeScript 规则：要求在函数括号前后添加一致的空格，多行匿名函数参数的第一个参数例外
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    // eslint规则：允许在操作符周围不添加空格
    'space-infix-ops': 'off',
    // TypeScript 规则：要求在操作符周围添加空格
    '@typescript-eslint/space-infix-ops': 'error',
    // eslint规则：允许在关键字前后不添加空格
    'keyword-spacing': 'off',
    // TypeScript 规则：要求在关键字前后添加空格
    '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],
    // eslint规则：允许在逗号后面不添加空格
    'comma-spacing': 'off',
    // TypeScript 规则：要求在逗号后面添加一个空格，逗号前面不添加空格
    '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
    // eslint规则：允许不必要的括号
    'no-extra-parens': 'off',
    // TypeScript 规则：要求删除不必要的括号，但保留函数参数列表的括号
    '@typescript-eslint/no-extra-parens': ['error', 'functions'],
    // eslint规则：允许类成员之间有重复名称的方法和属性
    'no-dupe-class-members': 'off',
    // TypeScript 规则：禁止在同一个类中定义重名的类成员
    '@typescript-eslint/no-dupe-class-members': 'error',
    // eslint规则：允许对数字进行运算，可能会导致精度丢失
    'no-loss-of-precision': 'off',
    // TypeScript 规则：禁止运算结果精度丢失
    '@typescript-eslint/no-loss-of-precision': 'error',
    // eslint规则：允许类成员之间不添加空行
    'lines-between-class-members': 'off',
    // TypeScript 规则：要求类成员之间始终添加一个空行，但在只有一行的情况下除外
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    // off
    // TypeScript 规则：要求一致的索引对象样式，即使用 string 或 number 作为键
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    // TypeScript 规则：不强制执行任何命名约定，需要手动在配置文件中指定
    '@typescript-eslint/naming-convention': 'off',
    // TypeScript 规则：不要求显式地声明函数返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    // TypeScript 规则：不要求显式地声明类成员的可访问性修饰符（public/private/protected）
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // TypeScript 规则：允许使用 any 类型
    '@typescript-eslint/no-explicit-any': 'off',
    // TypeScript 规则：不要求使用参数属性语法（即构造函数中将参数声明为类成员）
    '@typescript-eslint/parameter-properties': 'off',
    // TypeScript 规则：允许定义空接口
    '@typescript-eslint/no-empty-interface': 'off',
    // TypeScript 规则：允许使用 @ts-ignore
    '@typescript-eslint/ban-ts-ignore': 'off',
    // TypeScript 规则：允许定义空函数
    '@typescript-eslint/no-empty-function': 'off',
    // TypeScript 规则：允许使用 ! 后缀操作符进行非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // TypeScript 规则：不要求显式地声明导出函数和类的输入和输出类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // TypeScript 规则：允许使用 Object 和 Function 类型
    '@typescript-eslint/ban-types': 'off',
    // TypeScript 规则：允许使用 namespace 关键字定义命名空间
    '@typescript-eslint/no-namespace': 'off',
    // TypeScript 规则：允许使用三斜线指令引入模块
    '@typescript-eslint/triple-slash-reference': 'off',
    // eslint-plugin-unused-imports 规则：该规则会处理未使用的变量和未使用的导入
    // 此处禁用了 @typescript-eslint 的 no-unused-vars 规则，由 unused-imports 插件来处理
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
