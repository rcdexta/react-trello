import React from 'react'
import {storiesOf} from '@storybook/react'
import update from 'immutability-helper'

import {MovableCardWrapper} from 'rt/styles/Base'
import debug from './helpers/debug'

import Board from '../src'
import produce from 'immer'
import {BoardData, Card} from 'rt/types/Board'

const CustomCard = props => {
  return (
    <MovableCardWrapper
      data-id={props.id}
      onClick={props.onClick}
      className={props.className}
      style={{backgroundColor: props.cardColor, padding: 6, ...props.style}}>
      <header
        style={{
          borderBottom: '1px solid #eee',
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <div style={{fontSize: 14, fontWeight: 'bold'}}>{props.name}</div>
      </header>
      <div style={{fontSize: 12, color: '#BD3B36'}}>
        <div style={{color: '#4C4C4C', fontWeight: 'bold'}}>{props.subTitle}</div>
        <div style={{padding: '5px 0px'}}>
          <i>{props.body}</i>
        </div>
      </div>
    </MovableCardWrapper>
  )
}

const customCardData = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned',
      cards: [
        {
          id: 'Card1',
          name: 'John Smith',
          subTitle: 'SMS received at 12:13pm today',
          body: 'Thanks. Please schedule me for an estimate on Monday.',
          metadata: {id: 'Card1'}
        },
        {
          id: 'Card2',
          name: 'Card Weathers',
          subTitle: 'Email received at 1:14pm',
          body: 'Is the estimate free, and can someone call me soon?',
          metadata: {id: 'Card1'}
        }
      ]
    },
    {
      id: 'lane2',
      title: 'Work In Progress',
      cards: [
        {
          id: 'Card3',
          name: 'Michael Caine',
          subTitle: 'Email received at 4:23pm today',
          body: 'You are welcome. Interested in doing business with you again',
          metadata: {id: 'Card1'}
        }
      ]
    }
  ]
}

const BoardWithCustomCard = () => {
  const [boardData, setBoardData] = React.useState<BoardData>(customCardData)
  const onDragEnd = (cardId, sourceLandId, targetLaneId, index, card) => {
    debug('Calling onDragEnd')
    console.log('draggedData', draggedData)
    console.log('card', card)
    const updatedCard = produce<Card>(card, draft => {
      draft.cardColor = '#d0fdd2'
    })
    const updatedBoard = produce<BoardData>(boardData, draft => {
      const sourceLane = draft.lanes.find(lane => lane.id === sourceLandId)
      const targetLane = draft.lanes.find(lane => lane.id === targetLaneId)
      const cardIndex = sourceLane.cards.findIndex(card => card.id === cardId)
      sourceLane.cards.splice(cardIndex, 1)
      targetLane.cards.splice(index, 0, updatedCard)
    })
    setBoardData(updatedBoard)
  }
  return (
    <Board
      tagStyle={{fontSize: '80%'}}
      data={boardData}
      draggable
      handleDragEnd={onDragEnd}
      onCardClick={(cardId, metadata) => alert(`Card with id:${cardId} clicked. Has metadata.id: ${metadata.id}`)}
      components={{Card: CustomCard}}
    />
  )
}
storiesOf('Custom Components', module).add(
  'Drag-n-Drop Styling',
  () => {
    return <BoardWithCustomCard />
  },
  {info: 'Change card color on drag-n-drop'}
)
