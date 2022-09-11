import React, {Component, FC, PropsWithChildren} from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'
import {BoardData} from 'rt/types/Board'
import {EventBusHandle} from 'rt/types/EventBus'

let eventBus

const PER_PAGE = 15

const addCard = () => {
  eventBus.publish({
    type: 'ADD_CARD',
    laneId: 'Lane1',
    card: {
      id: '000',
      title: 'EC2 Instance Down',
      label: '30 mins',
      description: 'Main EC2 instance down',
      metadata: {cardId: '000'}
    }
  })
}

function generateCards(requestedPage = 1) {
  const cards = []
  let fetchedItems = (requestedPage - 1) * PER_PAGE
  for (let i = fetchedItems + 1; i <= fetchedItems + PER_PAGE; i++) {
    cards.push({
      id: `${i}`,
      title: `Card${i}`,
      description: `Description for #${i}`,
      metadata: {cardId: `${i}`}
    })
  }
  return cards
}
const delayedPromise = (durationInMs, resolutionPayload) => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(resolutionPayload)
    }, durationInMs)
  })
}
const BoardWrapper: FC<PropsWithChildren<{data: BoardData}>> = ({data, children}) => {
  const [boardData, setBoardData] = React.useState(data)
  const [eventBus, setEventBus] = React.useState<EventBusHandle>()

  const onDataChange = (newData: BoardData) => {
    setBoardData(newData)
  }
  const refreshCards = () => {
    setBoardData({
      lanes: [
        {
          id: 'Lane1',
          title: 'Changed Lane',
          cards: []
        }
      ]
    })
  }
  const paginate = (requestedPage, laneId) => {
    let newCards = generateCards(requestedPage)
    return delayedPromise(2000, newCards)
  }

  return (
    <div>
      <button onClick={addCard} style={{margin: 5}}>
        Add Card
      </button>
      <button onClick={refreshCards} style={{margin: 5}}>
        Refresh Board
      </button>
      <Board
        data={boardData}
        eventBusHandle={eventBus => setEventBus(eventBus)}
        laneSortFunction={(card1, card2) => parseInt(card1.id) - parseInt(card2.id)}
        onLaneScroll={paginate}
        onDataChange={onDataChange}
      />
    </div>
  )
}
// class BoardWrapper extends Component<{data: BoardData}> {
//   state = {data: this.props.data}

//   setEventBus = handle => {
//     eventBus = handle
//   }

//   delayedPromise = (durationInMs, resolutionPayload) => {
//     return new Promise(function (resolve) {
//       setTimeout(function () {
//         resolve(resolutionPayload)
//       }, durationInMs)
//     })
//   }

//   refreshCards = () => {
//     eventBus.publish({
//       type: 'REFRESH_BOARD',
//       data: {
//         lanes: [
//           {
//             id: 'Lane1',
//             title: 'Changed Lane',
//             cards: []
//           }
//         ]
//       }
//     })
//   }

//   paginate = (requestedPage, laneId) => {
//     let newCards = generateCards(requestedPage)
//     return this.delayedPromise(2000, newCards)
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={addCard} style={{margin: 5}}>
//           Add Card
//         </button>
//         <button onClick={this.refreshCards} style={{margin: 5}}>
//           Refresh Board
//         </button>
//         <Board
//           data={this.state.data}
//           eventBusHandle={handle => {
//             this.setEventBus(handle)
//           }}
//           laneSortFunction={(card1, card2) => parseInt(card1.id) - parseInt(card2.id)}
//           onLaneScroll={this.paginate}
//         />
//       </div>
//     )
//   }
// }

storiesOf('Advanced Features', module).add(
  'Scrolling and Events',
  () => {
    const data = {
      lanes: [
        {
          id: 'Lane1',
          title: 'Lane1',
          cards: generateCards()
        }
      ]
    }

    return <BoardWrapper data={data} />
  },
  {
    info: `
      Infinite scroll with onLaneScroll function callback to fetch more items
      
      The callback function passed to onLaneScroll will be of the following form
      ~~~js
      function paginate(requestedPage, laneId) {
        return fetchCardsFromBackend(laneId, requestedPage); 
      };
      ~~~
    `
  }
)
