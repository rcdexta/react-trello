# react-trello

Pluggable components to add a trello like kanban board to your application

[![Build Status](https://travis-ci.org/rcdexta/react-trello.svg?branch=master)](https://travis-ci.org/rcdexta/react-trello)
[![npm version](https://badge.fury.io/js/react-trello.svg)](https://badge.fury.io/js/react-trello)

## Features

![alt tag](https://github.com/rcdexta/react-trello/raw/master/react-trello.gif)

* responsive and extensible
* easily pluggable into existing application
* supports pagination on scrolling individual lanes
* drag-and-drop within and across lanes
* event bus for triggering external events (e.g.: adding or removing cards using realtime backend integration)

## Getting Started

```
npm install --save react-trello
```

## Usage

The `Board` component takes a prop called `data` that contains all the details related to rendering the board. A sample data json is given here to illustrate the contract:

```javascript
const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
	    {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}
```

The data is fed to the board component and that's it.

```jsx
 <Board data={data} />
```

Refer to storybook for detailed examples: https://rcdexta.github.io/react-trello/

## Documentation

### Board

This is the container component that encapsulates the lanes and cards

| Name             | Type     | Description                              |
| ---------------- | -------- | ---------------------------------------- |
| draggable        | boolean  | Makes all cards in the lanes draggable. Default: false |
| handleDragStart  | function | Callback function triggered when card drag is started: `handleDragStart(cardId, laneId)` |
| handleDragEnd    | function | Callback function triggered when card drag ends: `handleDragEnd(cardId, sourceLaneId, targetLaneId)` |
| onLaneScroll     | function | Called when a lane is scrolled to the end: `onLaneScroll(requestedPage, laneId)` |
| onCardClick      | function | Called when a card is clicked: `onCardClick(cardId, metadata) ` |
| laneSortFunction | function | Used to specify the logic to sort cards on a lane: `laneSortFunction(card1, card2)` |
| eventBushandle   | function | This is a special function that providers a publishHook to pass new events to the board. See details in Publish Events section |
| onDataChange     | function | Called everytime the data changes due to user interaction or event bus: `onDataChange(newData)` |

Refer to tests for more detailed info about the components

### Publish Events 

When defining the board, it is possible to obtain a event hook to the component to publish new events later after the board has been rendered. Refer the example below:

```javascript
let eventBus = undefined

let setEventBus = (handle) => {
  eventBus = handle
}
//To add a card
eventBus.publish({type: 'ADD_CARD', laneId: 'COMPLETED', card: {id: "M1", title: "Buy Milk", label: "15 mins", description: "Also set reminder"}})

//To remove a card
eventBus.publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: "M1"})
  
<Board data={data}
       eventBushandle={setEventBus}/>
```

The code will move the card `Buy Milk` from the planned lane to completed lane. We expect that this library can be wired to a backend push api that can alter the state of the board in realtime.

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
