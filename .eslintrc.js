module.exports = {
  root: true,
  extends: 'airbnb',
  parser: '@babel/eslint-parser',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': [0],
  },
};
