 module.exports = {
  parser:  '@typescript-eslint/parser',
  extends: [
    "standard",
    "plugin:promise/recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions:  {
    ecmaVersion:  2019,
    sourceType:  'module',
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "indent": ["error", 2, {
      "CallExpression": {"arguments": "off"},
      "MemberExpression": 0,
    }],
    "no-else-return": "error",
    "promise/valid-params": 0,
    "max-len": ["error", 120],
    "new-cap": "error",
    "no-const-assign": "error",
    "no-duplicate-imports": "error",
    "no-lonely-if": "error",
    "no-return-await": "error",
    "no-shadow": "error",
    "no-undefined": "error",
    "no-use-before-define": "error",
    "object-curly-spacing": ["error", "always"],
    "prefer-const": "error",
  }
}
