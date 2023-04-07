module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  reportUnusedDisableDirectives: true,
  extends: [
    'standard',
    'plugin:import/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:yml/standard',
    'plugin:markdown/recommended',
  ],
  ignorePatterns: [
    '*.min.*',
    '*.d.ts',
    'CHANGELOG.md',
    'dist',
    'LICENSE*',
    'output',
    'out',
    'coverage',
    'public',
    'temp',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    // ignore for in lint-staged
    '*.css',
    '*.png',
    '*.ico',
    '*.toml',
    '*.patch',
    '*.txt',
    '*.crt',
    '*.key',
    'Dockerfile',
    // force include
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],
  plugins: ['html', 'unicorn', 'no-only-tests', 'unused-imports'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] },
    },
  },
  overrides: [
    {
      files: ['*.json', '*.json5'],
      parser: 'jsonc-eslint-parser',
      rules: {
        // 禁止在数组括号内出现空格
        'jsonc/array-bracket-spacing': ['error', 'never'],
        // 禁止使用对象或数组末尾的逗号
        'jsonc/comma-dangle': ['error', 'never'],
        // 强制在逗号后使用一致的空格
        'jsonc/comma-style': ['error', 'last'],
        // 强制使用特定的缩进
        'jsonc/indent': ['error', 2],
        // 强制在键和值之间使用一致的空格
        'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
        // 禁止八进制转义字符
        'jsonc/no-octal-escape': 'error',
        // 要求花括号内换行符的一致性，并且要求最后一个元素后有一个换行符
        'jsonc/object-curly-newline': ['error', { multiline: true, consistent: true }],
        // 强制在花括号内使用一致的空格
        'jsonc/object-curly-spacing': ['error', 'always'],
        // 要求对象字面量属性换行时能够包含多个同一行的属性
        'jsonc/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
      },
    },
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        // 控制注释前后的空格
        'spaced-comment': 'off',
      },
    },
    {
      files: ['package.json'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            // 路径模式，选择要排序的键
            pathPattern: '^$',
            // 根据以下顺序排序这些键
            order: [
              'publisher',
              'name',
              'displayName',
              'type',
              'version',
              'private',
              'packageManager',
              'description',
              'author',
              'license',
              'funding',
              'homepage',
              'repository',
              'bugs',
              'keywords',
              'categories',
              'sideEffects',
              'exports',
              'main',
              'module',
              'unpkg',
              'jsdelivr',
              'types',
              'typesVersions',
              'bin',
              'icon',
              'files',
              'engines',
              'activationEvents',
              'contributes',
              'scripts',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'optionalDependencies',
              'devDependencies',
              'pnpm',
              'overrides',
              'resolutions',
              'husky',
              'simple-git-hooks',
              'lint-staged',
              'eslintConfig',
            ],
          },
          {
            // 路径模式，选择要排序的键
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            // 按照类型升序排列依赖项
            order: { type: 'asc' },
          },
          {
            // 路径模式，选择要排序的键
            pathPattern: '^exports.*$',
            // 根据以下顺序排序这些键
            order: ['types', 'require', 'import'],
          },
        ],
      },
    },
    // 针对 .d.ts 文件的规则
    {
      files: ['*.d.ts'],
      rules: {
        // 禁用 "import/no-duplicates" 规则
        'import/no-duplicates': 'off',
      },
    },
    // 针对 .js 和 .cjs 文件的规则
    {
      files: ['*.js', '*.cjs'],
      rules: {
        // 禁用 "@typescript-eslint/no-var-requires" 规则
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    // 针对 .ts、.tsx、.mts 和 .cts 文件的规则
    {
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      rules: {
        // 禁止将 void 操作符用在表达式中，但允许其作为语句使用
        'no-void': ['error', { allowAsStatement: true }],
      },
    },
    // 针对脚本和 CLI 文件的规则
    {
      files: ['scripts/**/*.*', 'cli.*'],
      rules: {
        // 禁用 "no-console" 规则
        'no-console': 'off',
      },
    },
    // 针对测试文件的规则
    {
      files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
      rules: {
        // 禁用 "no-unused-expressions" 规则
        'no-unused-expressions': 'off',
        // 禁止在测试用例中使用 only()
        'no-only-tests/no-only-tests': 'error',
      },
    },
    {
      // 对markdown文件中的代码块做出规则限制
      files: ['**/*.md/*.*'],
      // 对应的规则列表
      rules: {
        // 禁止在代码中重复声明变量，但是在markdown文件中不需要强制执行此规则
        '@typescript-eslint/no-redeclare': 'off',
        // 不强制要求未使用的变量，在markdown文件中可以允许存在未使用的变量
        '@typescript-eslint/no-unused-vars': 'off',
        // 允许使用未定义的变量或函数，因为markdown文件中可能会包含示例代码，而这些代码对于eslint来说是未定义的
        '@typescript-eslint/no-use-before-define': 'off',
        // 允许在markdown文件中使用require语句，因为markdown文件中可能会包含示例代码
        '@typescript-eslint/no-var-requires': 'off',
        // 配置禁止使用逗号结尾的方式，因为markdown文件中可能会包含示例代码，而这些示例代码可能会使用一些不符合标准的写法
        '@typescript-eslint/comma-dangle': 'off',
        // 不强制要求导入和类型保持一致，因为markdown文件中可能会包含一些示例代码，这些示例代码使用的是与实际应用程序不同的导入风格
        '@typescript-eslint/consistent-type-imports': 'off',
        // 允许导入无法解析的模块，因为markdown文件中可能会包含示例代码，这些示例代码可能会导入一些测试数据或不可用的第三方库
        'import/no-unresolved': 'off',
        // 不要求检查未使用的导入语句，因为markdown文件中可能会包含示例代码
        'unused-imports/no-unused-imports': 'off',
        // 不要求检查未使用的变量，在markdown文件中可以允许存在未使用的变量
        'unused-imports/no-unused-vars': 'off',
        // 允许在markdown文件中使用alert函数，因为markdown文件中可能会包含示例代码
        'no-alert': 'off',
        // 允许在markdown文件中使用console对象，因为markdown文件中可能会包含示例代码
        'no-console': 'off',
        // 允许在markdown文件中使用限制的导入，因为markdown文件中可能会包含示例代码
        'no-restricted-imports': 'off',
        // 允许在markdown文件中使用未定义的变量或函数，因为markdown文件中可能会包含示例代码
        'no-undef': 'off',
        // 允许在markdown文件中使用未使用的表达式，因为markdown文件中可能会包含示例代码
        'no-unused-expressions': 'off',
        // 不强制要求在代码中声明后未使用的变量，在markdown文件中可以允许存在未使用的变量
        'no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    // import 模块规则
    'import/order': 'error', // 强制模块导入/导出的顺序，例如将所有第三方库的导入放在项目内部模块导入之前
    'import/first': 'error', // 强制将所有 import 语句放在所有其他语句之前，以确保模块导入的一致性
    'import/no-mutable-exports': 'error', // 禁止将变量声明为可变的引用类型（例如数组和对象）进行导出
    'import/no-unresolved': 'off', // 禁止导入未知模块，但是在某些情况下，这并不总是可行或必要的
    'import/no-absolute-path': 'off', // 禁止使用绝对路径导入模块，但在特定情况下，可能需要绝对路径来访问资源
    'import/newline-after-import': ['error', { count: 1 }], // 要求 import 语句后面有一个空白行
    // 常见规则
    'semi': ['error', 'never'], // 禁止除`;`以外的结尾符号，确保代码的一致性
    'curly': ['error', 'multi-or-nest', 'consistent'], // 强制使用大括号限定代码块范围，即使只有一行，以提高代码的可读性
    'quotes': ['error', 'single'], // 强制使用单引号，一致性是许多团队开发中最重要的方面之一
    'quote-props': ['error', 'consistent-as-needed'], // 强制对象属性使用一致的引号风格，以便在不同的
    // eslint规则：防止未使用的导入
    'unused-imports/no-unused-imports': 'error',
    // eslint规则：防止未使用的变量
    'unused-imports/no-unused-vars': [
      'warn',
      {
        // 对所有变量生效
        vars: 'all',
        // 忽略以下划线开头的变量
        varsIgnorePattern: '^_',
        // 对函数参数进行检测，如果引用过就不会报错
        args: 'after-used',
        // 忽略以下划线开头的函数参数
        argsIgnorePattern: '^_',
      },
    ],
    // eslint规则：允许函数参数被重新赋值
    'no-param-reassign': 'off',
    // eslint规则：数组的左括号 "[" 后和右括号 "]" 前禁止有空格
    'array-bracket-spacing': ['error', 'never'],
    // eslint规则：控制代码块使用大括号的风格，"stroustrup"表示 stroustrup 风格
    // 允许单行使用大括号
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    // eslint规则：代码块（大括号）内部必须有空格
    'block-spacing': ['error', 'always'],
    // eslint规则：允许驼峰式命名法
    'camelcase': 'off',
    // eslint规则：逗号之前不要留空格，逗号之后必须留空格
    'comma-spacing': ['error', { before: false, after: true }],
    // eslint规则：在 JavaScript 的代码中，逗号写在行首，而非行尾。
    'comma-style': ['error', 'last'],
    // eslint规则：对象或数组最后一个元素后面加逗号
    'comma-dangle': ['error', 'always-multiline'],
    // eslint规则：禁止在条件语句中出现常量表达式
    'no-constant-condition': 'warn',
    // eslint规则：禁止使用 debugger 语句
    'no-debugger': 'error',
    // eslint规则：禁止使用 console 对象，除了 warn 和 error 方法
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // eslint规则：禁止在条件中使用赋值语句
    'no-cond-assign': ['error', 'always'],
    // eslint规则：允许在函数调用和定义时，在函数名和左括号之间没有空格
    'func-call-spacing': ['off', 'never'],
    // eslint规则：对象属性中，冒号后必须有一个空格，冒号前不能有空格
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // eslint规则：使用2个空格缩进，switch case 和 变量声明使用1个空格缩进
    'indent': ['error', 2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
    // eslint规则：禁止使用特定的语法
    'no-restricted-syntax': [
      'error',
      // 禁止使用 DebuggerStatement
      'DebuggerStatement',
      // 禁止使用 LabeledStatement
      'LabeledStatement',
      // 禁止使用 WithStatement
      'WithStatement',
    ],
    // eslint规则：大括号内部要有空格
    'object-curly-spacing': ['error', 'always'],
    // eslint规则：允许在return语句中使用await表达式
    'no-return-await': 'off',
    // eslint规则：函数声明时，括号前要留空格。箭头函数除外，在箭头函数中，括号前不能留空格
    'space-before-function-paren': [
      'error',
      {
        // 匿名函数命名必须留空格
        anonymous: 'always',
        // 命名函数命名前不能留空格
        named: 'never',
        // 异步箭头函数命名前留一个空格
        asyncArrow: 'always',
      },
    ],
    // es6
    // eslint规则：不允许使用 var
    'no-var': 'error',
    // eslint规则：如果变量没有重新赋值，必须使用 const 声明
    'prefer-const': [
      'error',
      {
        // 对于解构操作的变量，也需要使用 const 声明
        destructuring: 'all',
        // 忽略在变量声明之前就读取变量的情况
        ignoreReadBeforeAssign: true,
      },
    ],
    // eslint规则：箭头函数作为回调函数时，强制使用箭头函数语法。可以绑定 this，避免使用 bind 函数。
    'prefer-arrow-callback': [
      'error',
      {
        // 不允许使用命名函数表达式
        allowNamedFunctions: false,
        // 允许传递 this 给回调函数
        allowUnboundThis: true,
      },
    ],
    // eslint规则：要求对象字面量中方法和属性使用简写语法
    'object-shorthand': [
      'error',
      // 总是使用简写语法
      'always',
      {
        // 构造函数中不能使用简写语法
        ignoreConstructors: false,
        // 尽量不使用引号
        avoidQuotes: true,
      },
    ],
    // eslint规则：在指数运算符 "**" 中使用前缀或后缀表示法
    'prefer-exponentiation-operator': 'error',
    // eslint规则：推荐使用 rest 参数，而不是 arguments 对象
    'prefer-rest-params': 'error',
    // eslint规则：推荐使用展开语法 "..." 而不是 .apply()
    'prefer-spread': 'error',
    // eslint规则：推荐使用模板字符串 ${} 的形式来代替字符串拼接
    'prefer-template': 'error',
    // eslint规则：模板字符串中括号内的首尾禁止留空格
    'template-curly-spacing': 'error',
    // eslint规则：要求箭头函数的参数使用圆括号，但只有一个参数时可以省略圆括号
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    // eslint规则：生成器函数的星号后面必须加空格，除非是紧贴着左括号（即作为方法使用）
    'generator-star-spacing': 'off',
    // eslint规则：要求注释前必须有空格，且 // 或 /* 后必须跟文字内容
    'spaced-comment': [
      'error',
      'always',
      {
        // 配置 // 注释的情况
        line: {
          markers: ['/'],
          exceptions: ['/', '#'],
        },
        // 配置 /* */ 注释的情况
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    // best-practice
    // eslint规则：数组的方法回调函数必须有返回值
    'array-callback-return': 'error',
    // eslint规则：禁止在块级作用域外使用 var 关键字定义变量
    'block-scoped-var': 'error',
    // eslint规则：强制函数的返回值必须是一致的，包括 return 语句和不返回值的函数最后一行代码
    'consistent-return': 'off',
    // eslint规则：复杂度阈值为11，超过此阈值将会出现警告
    'complexity': ['off', 11],
    // eslint规则：比较操作符要求使用 === 和 !==，除了以下情况：
    // + 与 - 号一起作为单元运算符时，可以使用 == 和 !=
    // + typeof 操作符与字符串直接比较
    'eqeqeq': ['error', 'smart'],
    // eslint规则：禁止使用 alert() 方法
    'no-alert': 'warn',
    // eslint规则：禁止在 case 或 default 子句中声明变量
    'no-case-declarations': 'error',
    // eslint规则：禁止多个空格
    'no-multi-spaces': 'error',
    // eslint规则：禁止使用多行字符串
    'no-multi-str': 'error',
    // eslint规则：禁止使用 with 语句
    'no-with': 'error',
    // eslint规则：禁止使用 void 操作符
    'no-void': 'error',
    // eslint规则：允许使用转义字符
    'no-useless-escape': 'off',
    // eslint规则：要求变量声明在作用域顶部
    'vars-on-top': 'error',
    // eslint规则：async 函数必须有 await 语句
    'require-await': 'off',
    // eslint规则：允许返回值作为赋值语句的一部分
    'no-return-assign': 'off',
    // eslint规则：二元运算符的操作数必须换行时放在行首
    'operator-linebreak': ['error', 'before'],
    // eslint规则：每行最多只能有一条语句
    'max-statements-per-line': ['error', { max: 1 }],
    // node
    // 'n/prefer-global/process': ['error', 'never'], // Not sure if we need it as we are using `process.env.NODE_ENV` a lot in front-end.
    // eslint规则：不允许在全局作用域中使用 Buffer 构造函数
    'n/prefer-global/buffer': ['error', 'never'],
    // eslint规则：禁止使用字面量作为函数参数回调函数的参数
    'n/no-callback-literal': 'off',
    // unicorns
    // eslint规则：unicorn 是一个有关写 JavaScript 代码的插件，以下是 unicorn 插件的一些规则
    // eslint规则：抛出错误时必须传入错误信息
    'unicorn/error-message': 'error',
    // eslint规则：正则表达式转义字符要统一使用大写
    'unicorn/escape-case': 'error',
    // eslint规则：禁止使用 instanceof 操作符判断数组类型
    'unicorn/no-instanceof-array': 'error',
    // eslint规则：禁止使用 new Buffer() 构造函数
    'unicorn/no-new-buffer': 'error',
    // eslint规则：禁止使用具有安全风险的正则表达式
    'unicorn/no-unsafe-regex': 'off',
    // eslint规则：推荐使用小写的数字格式（例如 0x1'error' 而不是 0X1'error'）
    'unicorn/number-literal-case': 'error',
    // eslint规则：当检查是否包含某个值时，优先考虑 includes() 方法而非 indexOf() 方法
    'unicorn/prefer-includes': 'error',
    // eslint规则：优先使用 startsWith/endsWith 方法而非复杂的字符串操作
    'unicorn/prefer-string-starts-ends-with': 'error',
    // eslint规则：避免使用 innerText 属性，改用 textContent 属性
    'unicorn/prefer-text-content': 'error',
    // eslint规则：在 throw new Error() 中必须使用 TypeError 类型的错误
    'unicorn/prefer-type-error': 'error',
    // eslint规则：抛出错误时必须使用 new 关键字
    'unicorn/throw-new-error': 'error',
    // eslint规则：推荐在模块内部引入 Node.js 模块时，使用 node: 协议
    'unicorn/prefer-node-protocol': 'error',
    // eslint规则：禁止在变量声明前使用该变量
    'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
    // eslint规则：禁止在单行注释中启用和禁用其他规则
    'eslint-comments/disable-enable-pair': 'off',
    // eslint规则：允许导入模块的默认成员，并将其作为属性使用
    'import/no-named-as-default-member': 'off',
    // eslint规则：允许导入模块的默认成员，并使用该成员的名称
    'import/no-named-as-default': 'off',
    // eslint规则：禁止使用 import * as namespace 这种形式导入模块
    'import/namespace': 'off',
    // eslint规则：要求 import 语句按照一定的顺序排列
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        // 忽略导入的声明排序，例如按字母表顺序
        ignoreDeclarationSort: true,
        // 不忽略成员的排序，应该按字母表或其他某个规则排序
        ignoreMemberSort: false,
        // 按 none、all、multiple 和 single 的顺序对成员进行排序
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        // 是否允许分组，如果为 false，则所有导入声明必须按字母表顺序排序
        allowSeparatedGroups: false,
      },
    ],
    // yml 规则：以下是 yml 插件的一些规则
    // eslint规则：禁止在 yml 中使用双引号
    'yml/quotes': ['error', { prefer: 'single', avoidEscape: false }],
    // eslint规则：禁止空的 yml 文档
    'yml/no-empty-document': 'off',
    // eslint规则: 不限制disbale注释
    'no-unlimited-disable': ['off'],
  },
}
