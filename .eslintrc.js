const path = require('path');

module.exports = {
  extends: [path.resolve(__dirname, './bin/eslint.base.js')],
  parserOptions: {
    project: [
      path.resolve(__dirname, 'tsconfig.json'),
      path.resolve(__dirname, 'bin/tsconfig.eslint.json'),
    ],
  },
  rules: {},
};
