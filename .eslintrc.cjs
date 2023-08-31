module.exports = {
  extends: [
    'airbnb-base',
    // 'eslint:recommended',
  ],
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  rules: {
    // 'prettier/prettier': 'error',
    //     // enable additional rules
    //     indent: ['error', 2],
    //     'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    //     semi: ['error', 'always'],
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'class-methods-use-this': 'off',
    'no-lonely-if': 'off',
    'no-underscore-dangle': 'off',
    'no-bitwise': 'off',
    'object-curly-newline': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'comma-dangle': 'off',
    //     'no-cond-assign': ['error', 'always'],
    //     // disable rules from base configurations
    //     'no-console': 'off',
  },
};
