import React from 'react';
import {storiesOf} from '@kadira/storybook';

import {Board} from '../src';

const data = require('./data.json');

let publish = undefined

let setHandle = (handle) => {
  publish = handle.publishHook
}

const completeMilkEvent = () => {
  publish({type: 'ADD_CARD', laneId: 'COMPLETED', card: {id: "Milk", title: "Buy Milk", label: "15 mins", description: "Use Headspace app"}})
  publish({type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: "Milk"})
}

const addBlockedEvent = () => {
  publish({type: 'ADD_CARD', laneId: 'BLOCKED', card: {id: "Ec2Error", title: "EC2 Instance Down", label: "30 mins", description: "Main Ec2 instance down"}})
}

storiesOf('react-trello', module)

  .addWithInfo('Realtime Events',
    'This is an illustration of external events that modify the cards in the board',
    () => (
      <div>
        <button onClick={completeMilkEvent} style={{margin: 5}}>Complete Buy Milk</button>
        <button onClick={addBlockedEvent} style={{margin: 5}}>Add Blocked</button>
        <Board data={data}
               callbackHandle={setHandle}/>
      </div>
    ));
