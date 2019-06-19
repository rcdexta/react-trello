// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  'moduleNameMapper': {
    '\\.(jpg|png|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    "\\.(css)$": "<rootDir>/node_modules/jest-css-modules"
  },
  'coveragePathIgnorePatterns': [
    '/stories/',
    '/.storybook/',
    '<rootDir>/node_modules/',
    'story(.*).tsx'
  ],
  collectCoverage: true
}
