module.exports = {
  extends: [
    'standard'
  ],
  parser: 'babel-eslint',
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', {
      'after': true,
      'before': false
    }],
    'max-len': ['error', 120],
    'eqeqeq': 'error',
    'indent': ['error', 2, {
      MemberExpression: 1,
      SwitchCase: 1,
    }],
    'new-cap': 'error',
    'no-const-assign': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-lonely-if': 'error',
    'no-return-await': 'error',
    'no-shadow': 'error',
    'no-undefined': 'error',
    'no-use-before-define': 'error',
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'sort-vars': 'warn'
  },
  globals: {
    it: true,
    describe: true
  },
}
