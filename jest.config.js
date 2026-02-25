// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  'moduleNameMapper': {
    '\\.(jpg|png|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    "\\.(css)$": "identity-obj-proxy"
  },
  'testPathIgnorePatterns': [
    '/node_modules/',
    // Storyshots requires Storybook v8+; update storybook to re-enable
    'tests/Storyshots.test.js'
  ],
  'coveragePathIgnorePatterns': [
    '/stories/',
    '/.storybook/',
    '<rootDir>/node_modules/',
    'story(.*).tsx'
  ],
  collectCoverage: true
}
