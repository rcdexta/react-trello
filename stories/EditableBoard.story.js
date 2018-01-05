import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data.json')

storiesOf('Editable Board', module)
  .add(
    'Add/Delete Cards',
    withInfo('Add/delete cards or delete lanes')(() => {
      const shouldReceiveNewData = nextData => {
        console.log('Board has changed')
        console.log(nextData)
      }

      const handleCardDelete = (cardId, laneId) => {
        console.log(`Card: ${cardId} deleted from lane: ${laneId}`)
      }

      const handleCardAdd = (card, laneId) => {
        console.log(`New card added to lane ${laneId}`)
        console.dir(card)
      }

      return (
        <Board
          data={data}
          draggable
          onDataChange={shouldReceiveNewData}
          onCardDelete={handleCardDelete}
          onCardAdd={handleCardAdd}
          onCardClick={(cardId, metadata, laneId) => alert(`Card with id:${cardId} clicked. Card in lane: ${laneId}`)}
          editable
        />
      )
    })
  )
  .add(
    'Customizations',
    withInfo('Allow editable elements on the board to be customized')(() => {
      return (
        <Board
          data={data}
          editable
					addCardLink={<button>New Card</button>}
        />
      )
    })
  )
