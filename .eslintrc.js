module.exports = {
  'env': {
    'node': true,
    'browser': false,
    'commonjs': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  "parserOptions": {
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-console': 'off',
    'no-ternary': 0,
    'no-nested-ternary': 0,
    'multiline-ternary': 0
  }
}
