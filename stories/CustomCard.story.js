import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'


import {Board} from '../src'

const CustomCard = props => {
  return (
    <div>
      <header
        style={{
          borderBottom: '1px solid #eee',
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: props.cardColor
        }}
      >
        <div style={{fontSize: 14, fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div style={{fontSize: 11}}>
          {props.dueOn}
        </div>
      </header>
      <div style={{fontSize: 12, color: '#BD3B36'}}>
        <div style={{color: '#4C4C4C', fontWeight: 'bold'}}>
          {props.subTitle}
        </div>
        <div style={{padding: '5px 0px'}}>
          <i>
            {props.body}
          </i>
        </div>
        <div style={{marginTop: 10, textAlign: 'center', color: props.cardColor, fontSize: 15, fontWeight: 'bold'}}>
          {props.escalationText}
        </div>
      </div>
    </div>
  )
}

storiesOf('React Trello', module).add(
    'Custom Card styling',
    withInfo('Style your own cards')(() => {
      const data = {
        lanes: [
          {
            id: 'lane1',
            title: 'Planned Tasks',
            cards: [
              {
                id: 'Card1',
                name: 'John Smith',
                dueOn: 'due in a day',
                subTitle: 'SMS received at 12:13pm today',
                body: 'Thanks. Please schedule me for an estimate on Monday.',
                escalationText: 'Escalated to OPS-ESCALATIONS!',
                cardColor: '#BD3B36',
                cardStyle: {borderRadius: 6, boxShadow: '0 0 6px 1px #BD3B36', marginBottom: 15}
              },
              {
                id: 'Card2',
                name: 'Card Weathers',
                dueOn: 'due now',
                subTitle: 'Email received at 1:14pm',
                body: 'Is the estimate free, and can someone call me soon?',
                escalationText: 'Escalated to Admin',
                cardColor: '#E08521',
                cardStyle: {borderRadius: 6, boxShadow: '0 0 6px 1px #E08521', marginBottom: 15}
              }
            ]
          },
          {
            id: 'lane2',
            title: 'Completed Tasks',
            cards: [
              {
                id: 'Card3',
                name: 'Michael Caine',
                dueOn: 'due in a day',
                subTitle: 'Email received at 4:23pm today',
                body: 'You are welcome. Interested in doing business with you' + ' again',
                escalationText: 'Escalated to OPS-ESCALATIONS!',
                cardColor: '#BD3B36',
                cardStyle: {borderRadius: 6, boxShadow: '0 0 6px 1px #BD3B36', marginBottom: 15}
              }
            ]
          }
        ]
      }

      return (
          <Board data={data} draggable customCardLayout>
            <CustomCard />
          </Board>
      )
    })
)