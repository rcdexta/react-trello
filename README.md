#react-trello

Pluggable components to add a trello like kanban board for your application

[![Build Status](https://travis-ci.org/rcdexta/react-trello.svg?branch=master)](https://travis-ci.org/rcdexta/react-trello)

## Features

* responsive, extensible and light-weight
* easily pluggable into existing application

## Getting Started

```
npm install --save react-trello

```

## Usage

Refer to storybook for detailed examples: https://rcdexta.github.io/react-trello/

## Development
```
cd react-trello/
yarn install
yarn run storybook
```

### Scripts

1. `npm run lint` : Lint all js files
1. `npm run lintfix` : fix linting errors of all js files
1. `npm run semantic-release` : make a release. Leave it for CI to do.
1. `npm run storybook`: Start developing by using storybook
1. `npm run test` : Run tests. tests file should be written as `*.test.js` and using ES2015
1. `npm run test:watch` : Watch tests while writing
1. `npm run test:cover` : Show coverage report of your tests
1. `npm run test:report` : Report test coverage to codecov.io. Leave this for CI
1. `npm run build`: transpile all ES6 component files into ES5(commonjs) and put it in `dist` directory
1. `npm run docs`: create static build of storybook in `docs` directory that can be used for github pages

Learn how to write stories [here](https://getstorybook.io/docs/basics/writing-stories)

### License
MIT
