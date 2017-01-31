import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board, Lane, Card} from '../components';

const data = require('./data.json');

function delayedPromise(duration, resolution) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(resolution);
    }, duration)
  });
}

function generateCards(startWith = 0, laneKey) {
  const cards = []
  for (let i = startWith + 1; i <= startWith + 10; i++) {
    cards.push(<Card key={i}
                     id={(i).toString()}
                     title={`Card${i}`}
                     description={`Description for #${i}`}
    />)
  }
  return cards
}

function paginate(lastCardId) {
  let newCards = generateCards(parseInt(lastCardId));
  return delayedPromise(2000, newCards);
}

storiesOf('react-trello', module)
  .add('Infinite Scrolling',
    () => (
      <Board>
        <Lane key='Lane1'
              title='Paginated Lane'
              onScroll={paginate}
              cards={generateCards()}
        />
      </Board>
    ))

