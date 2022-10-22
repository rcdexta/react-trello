// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|png|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css)$': 'identity-obj-proxy'
  },
  setupFiles: ['<rootDir>/.jest/register-context.js'],
  coveragePathIgnorePatterns: ['/stories/', '/.storybook/', '<rootDir>/node_modules/', 'story(.*).tsx'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
  globals: {
    'ts-jest': {
      babelConfig: '.babelrc'
    }
  }
}
