import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board, Lane, Card} from '../components';

storiesOf('react-trello', module)
  .addWithInfo('Infinite Scrolling',
    `
      Infinite scroll with OnScroll function callback to fetch more items
      
      The callback function passed to onScroll will be of the following form
      ~~~js
      function paginate(requestedPage, laneId) {
        return fetchCardsFromBackend(laneId, requestedPage); 
      };
      ~~~
    `,
    () => {
      const PER_PAGE = 10

      function delayedPromise(duration, resolution) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(resolution);
          }, duration)
        });
      }

      function generateCards(requestedPage=1) {
        const cards = []
        let fetchedItems = (requestedPage - 1) * PER_PAGE;
        for (let i = fetchedItems + 1; i <= fetchedItems + PER_PAGE; i++) {
          cards.push({
            key: `Card${i}`,
            title: `Card${i}`,
            description: `Description for #${i}`
          })
        }
        return cards
      }

      function paginate(requestedPage, laneId) {
        let newCards = generateCards(requestedPage);
        return delayedPromise(2000, newCards);
      }

      return <Board>
        <Lane id='Lane1'
              key='Lane 1'
              title='Paginated Lane'
              onScroll={paginate}
              cards={generateCards()}
        />
      </Board>
    })

