#react-trello

Pluggable components to add a trello like kanban board to your application

[![Build Status](https://travis-ci.org/rcdexta/react-trello.svg?branch=master)](https://travis-ci.org/rcdexta/react-trello)
[![npm version](https://badge.fury.io/js/react-trello.svg)](https://badge.fury.io/js/react-trello)

## Features

![alt tag](https://github.com/rcdexta/react-trello/raw/master/react-trello.gif)

* responsive, extensible and light-weight
* easily pluggable into existing application
* supports pagination on scrolling individual lanes
* drag-and-drop within and across lanes
* api callback functions for all events 

## Getting Started

```
npm install --save react-trello
```

## Usage

A simple board with a single lane can be created likewise:

```jsx
 <Board>
        <Lane key='Lane1'
              title='Planned Tasks'>
                <Card key='Card1'
                      title='Board and Lane'
                      description='Trello board and Lane as components'
                      rightHeader='2 days'/>
                <Card key='Card2'
                      title='Card as component'
                      description='Model a simple card component'
                      rightHeader='1 day'/>
          </Lane>          
      </Board>
```

Refer to storybook for detailed examples: https://rcdexta.github.io/react-trello/

## Documentation

### Board

This is the container component that encapsulates the lanes and cards

| Name        | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| draggable   | boolean  | Makes all cards in the lanes draggable. Default: false |
| onDragStart | function | Callback function triggered when card drag is started: `onDragStart(cardId, laneId)` |
| onDragEnd   | function | Callback function triggered when card drag ends: `onDragEnd(cardId, laneId)` |

### Lane

Each lane in the board is modeled after this component

| Name        | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| title       | string   | The title for the lane                   |
| key         | string   | Unique key for the lane. Passed as param in callback functions |
| rightHeader | node     | Element to be rendered on the top-right corner |
| cards       | array    | List of Card components as a json array. Each json element should contain `id`,`key`,`title` and optional`description` |
| onScroll    | function | Pagination callback function called when lane scrolled to bottom `onScroll(lastCardId, laneId)` |
| children    | nodes    | Pass Card component as children if not passed as `cards` prop |

###  Card

| Name        | Type     | Description                              |
| ----------- | -------- | ---------------------------------------- |
| title       | string   | The title for the card                   |
| key         | string   | Unique key for the card. Passed as param in callback functions |
| rightHeader | node     | Element to be rendered on the top-right corner |
| description | node     | Secondary label for the card             |
| onClick     | function | Callback function when the card is clicked |

Refer to tests for more detailed info about the components

## Development

```
cd react-trello/
yarn install
yarn run storybook
```

### Scripts

1. `npm run lint` : Lint all js files
2. `npm run lintfix` : fix linting errors of all js files
3. `npm run semantic-release` : make a release. Leave it for CI to do.
4. `npm run storybook`: Start developing by using storybook
5. `npm run test` : Run tests. tests file should be written as `*.test.js` and using ES2015
6. `npm run test:watch` : Watch tests while writing
7. `npm run test:cover` : Show coverage report of your tests
8. `npm run test:report` : Report test coverage to codecov.io. Leave this for CI
9. `npm run build`: transpile all ES6 component files into ES5(commonjs) and put it in `dist` directory
10. `npm run docs`: create static build of storybook in `docs` directory that can be used for github pages

Learn how to write stories [here](https://getstorybook.io/docs/basics/writing-stories)

### License
MIT


