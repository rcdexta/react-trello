import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

storiesOf('react-trello', module)
  .addWithInfo('Infinite Scrolling',
    `
      Infinite scroll with onLaneScroll function callback to fetch more items
      
      The callback function passed to onLaneScroll will be of the following form
      ~~~js
      function paginate(requestedPage, laneId) {
        return fetchCardsFromBackend(laneId, requestedPage); 
      };
      ~~~
    `,
    () => {
      const PER_PAGE = 15

      function delayedPromise(durationInMs, resolutionPayload) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve(resolutionPayload);
          }, durationInMs)
        });
      }

      function generateCards(requestedPage = 1) {
        const cards = []
        let fetchedItems = (requestedPage - 1) * PER_PAGE;
        for (let i = fetchedItems + 1; i <= fetchedItems + PER_PAGE; i++) {
          cards.push({
            id: `Card${i}`,
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

      const data = {
        lanes: [{
          id: 'Lane1',
          title: 'Lane1',
          cards: generateCards()
        }]
      }

      return <Board data={data}
                    onLaneScroll={paginate}/>
    })

