const { isPackageExists } = require('local-pkg')

const TS = isPackageExists('typescript')
if (!TS) {
  console.warn('[@gopowerteam/eslint-config] TypeScript is not installed, fallback to JS only.')
}
module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        // eslint规则：允许存在未使用的变量
        'no-unused-vars': 'off',
        // eslint规则：允许使用未定义的变量
        'no-undef': 'off',
        // 如果当前文件是 TypeScript 文件，则禁用 @typescript-eslint 的 no-unused-vars 规则，
        // 因为 eslint 已经有了 no-unused-vars 规则，无需重复执行
        ...(TS ? { '@typescript-eslint/no-unused-vars': 'off' } : null),
      },
    },
  ],
  extends: [
    'plugin:vue/vue3-recommended',
    TS ? '@gopowerteam/eslint-config-ts' : '@gopowerteam/eslint-config-basic',
  ],
  rules: {
    // eslint-plugin-vue 规则：允许单行3个属性,多行1一个属性
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    // eslint-plugin-vue 规则：允许在一个文件中定义多个组件
    'vue/one-component-per-file': 'off',
    // eslint-plugin-vue 规则：允许在模板中使用 v-html 指令渲染 HTML
    'vue/no-v-html': 'off',
    // eslint-plugin-vue 规则：不要求定义 props 的类型
    'vue/require-prop-types': 'off',
    // eslint-plugin-vue 规则：不要求为 props 设置默认值
    'vue/require-default-prop': 'off',
    // eslint-plugin-vue 规则：不强制使用短横线命名组件
    'vue/multi-word-component-names': 'off',
    // eslint-plugin-vue 规则：不要求从 Vue 导入组件
    'vue/prefer-import-from-vue': 'off',
    // eslint-plugin-vue 规则：允许在组件中使用 v-text 和 v-html 指令
    'vue/no-v-text-v-html-on-component': 'off',
    // eslint-plugin-vue 规则：禁止在 setup 函数中解构 props
    'vue/no-setup-props-destructure': 'off',
    // eslint-plugin-vue 规则：要求按照 script、template、style 的顺序书写组件标签
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'style', 'script', 'route'],
      },
    ],
    // eslint-plugin-vue 规则：要求在块级元素之前和内联元素之后始终添加换行符
    'vue/block-tag-newline': [
      'error',
      {
        singleline: 'always',
        multiline: 'always',
      },
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true,
    }],
    // eslint-plugin-vue 规则：要求组件选项使用 PascalCase 命名法
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    // eslint-plugin-vue 规则：要求自定义事件名使用 camelCase 命名法
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    // eslint-plugin-vue 规则：要求按照 defineProps 和 defineEmits 的顺序书写组件宏
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
      },
    ],
    // eslint-plugin-vue 规则：要求在 HTML 注释的开始符和结束符之间始终至少有一个空格
    'vue/html-comment-content-spacing': [
      'error',
      'always',
      {
        exceptions: ['-'],
      },
    ],
    // eslint-plugin-vue 规则：禁止使用以 v- 开头的动态指令绑定所有属性，只允许绑定指令
    'vue/no-restricted-v-bind': ['error', '/^v-/'],
    // eslint-plugin-vue 规则：不允许将 v-bind 指令用于已经有了相应绑定值的元素上
    'vue/no-useless-v-bind': 'error',
    // eslint-plugin-vue 规则：允许定义但未使用的 ref
    'vue/no-unused-refs': 'off',
    // eslint-plugin-vue 规则：要求在组件的根元素和块级元素之间始终添加一个空行
    'vue/padding-line-between-blocks': ['error', 'always'],
    // eslint-plugin-vue 规则：要求将静态 class 属性从其它属性分开写，以提高可读性
    'vue/prefer-separate-static-class': 'error',
    // extensions
    // eslint-plugin-vue 规则：要求数组的方括号内部不留空隙
    'vue/array-bracket-spacing': ['error', 'never'],
    // eslint-plugin-vue 规则：要求箭头函数的箭头前后都有空格
    'vue/arrow-spacing': ['error', { before: true, after: true }],
    // eslint-plugin-vue 规则：要求在块级元素和花括号之间始终添加空格
    'vue/block-spacing': ['error', 'always'],
    // eslint-plugin-vue 规则：要求花括号的风格为 stroustrup 风格，并允许单行写法
    'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    // eslint-plugin-vue 规则：要求使用逗号分隔对象和数组字面量中的项，且最后一项必须有逗号
    'vue/comma-dangle': ['error', 'always-multiline'],
    // eslint-plugin-vue 规则：要求在逗号后面添加一个空格，而在逗号前面不能有空格
    'vue/comma-spacing': ['error', { before: false, after: true }],
    // eslint-plugin-vue 规则：要求逗号放在末尾
    'vue/comma-style': ['error', 'last'],
    // eslint-plugin-vue 规则：要求属性访问表达式点号的位置在属性名称的开头
    'vue/dot-location': ['error', 'property'],
    // eslint-plugin-vue 规则：要求尽可能使用点号来访问对象的属性
    'vue/dot-notation': ['error', { allowKeywords: true }],
    // eslint-plugin-vue 规则：要求使用全等（===）或不等（!==）操作符代替相等（==）或不相等（!=）操作符，除了以下几种情况
    // - 比较一个变量与 null 或 undefined 是否相等
    // - 使用 typeof 操作符检查一个值的类型
    'vue/eqeqeq': ['error', 'smart'],
    // 'vue/func-call-spacing': ['off', 'never'],
    // eslint-plugin-vue 规则：要求属性值前面不留空格，后面必须有一个空格
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // eslint-plugin-vue 规则：要求在关键字前后添加一个空格
    'vue/keyword-spacing': ['error', { before: true, after: true }],
    // eslint-plugin-vue 规则：不允许在 if、for、while 等条件语句中使用常量表达式作为条件，以避免无限循环
    'vue/no-constant-condition': 'warn',
    // eslint-plugin-vue 规则：不允许解构模式为空
    'vue/no-empty-pattern': 'error',
    // eslint-plugin-vue 规则：禁止多余的括号，但允许在函数表达式周围使用括号
    'vue/no-extra-parens': ['error', 'functions'],
    // eslint-plugin-vue 规则：禁止使用非法 Unicode 字符（包括全角空格）
    'vue/no-irregular-whitespace': 'error',
    // eslint-plugin-vue 规则：不允许丢失精度，如将数值从十进制转换为二进制再转回十进制可能导致精度丢失
    'vue/no-loss-of-precision': 'error',
    // eslint-plugin-vue 规则：禁用特定的语法
    'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    // eslint-plugin-vue 规则：不允许使用稀疏数组（例如 [1,,2] 中的第二个逗号）
    'vue/no-sparse-arrays': 'error',
    // eslint-plugin-vue 规则：要求在对象的花括号内部始终添加换行符，且必须保持一致
    'vue/object-curly-newline': ['error', { multiline: true, consistent: true }],
    // eslint-plugin-vue 规则：要求在对象的花括号内部始终添加空格
    'vue/object-curly-spacing': ['error', 'always'],
    // eslint-plugin-vue 规则：要求在每个属性上都添加换行符，除非该属性已经占据了一整行
    'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    // eslint-plugin-vue 规则：要求使用对象字面量简写语法
    'vue/object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    // eslint-plugin-vue 规则：要求运算符在新行之前
    'vue/operator-linebreak': ['error', 'before'],
    // eslint-plugin-vue 规则：优先使用模板字符串而非字符串拼接，以提高可读性和性能
    'vue/prefer-template': 'error',
    // eslint-plugin-vue 规则：要求在对象字面量属性名称上加引号的情况必须保持一致，同时只有需要时才添加引号
    'vue/quote-props': ['error', 'consistent-as-needed'],
    // eslint-plugin-vue 规则：要求在圆括号内部始终不添加空格
    'vue/space-in-parens': ['error', 'never'],
    // eslint-plugin-vue 规则：要求在操作符周围添加空格
    'vue/space-infix-ops': 'error',
    // eslint-plugin-vue 规则：要求在一元操作符周围添加空格
    'vue/space-unary-ops': ['error', { words: true, nonwords: false }],
    // eslint-plugin-vue 规则：要求模板字符串中的花括号内部不添加空格
    'vue/template-curly-spacing': 'error',
    // eslint-plugin-vue 规则：该规则强制使用一致的反勾号、双引号或单引号。
    'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
    //  eslint-plugin-vue 规则：属性排序
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      },
    ],
    // eslint-plugin-vue 规则：控制html代码缩进
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    // eslint-plugin-vue 规则：允许使用,运算符
    'no-sequences': ['off'],
    // eslint-plugin-vue 规则：reject需要返回Error
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
  },
}
