import React, {Component} from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data.json')

class NewCard extends Component {
  updateField = (field, evt) => {
    this.setState({[field]: evt.target.value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render () {
    const {onCancel} = this.props
    return (
      <div style={{background: 'white', borderRadius: 3, border: '1px solid #eee', borderBottom: '1px solid #ccc'}}>
        <div style={{padding: 5, margin: 5}}>
          <div>
            <div style={{marginBottom: 5}}>
                <input type='text' onChange={evt => this.updateField('title', evt)} placeholder='Title' />
            </div>
            <div style={{marginBottom: 5}}>
              <input type='text' onChange={evt => this.updateField('description', evt)} placeholder='Description'/>
            </div>
          </div>
          <button onClick={this.handleAdd}>Add</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
  }
}

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
          id='EditableBoard1'
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
    'Custom Buttons',
    withInfo('Allow editable elements on the board to be customized')(() => {
      return <Board data={data} editable addCardLink={<button>New Card</button>} />
    })
  )
  .add(
    'New Card Template',
    withInfo('Pass a custom new card template to add card')(() => {
      return <Board data={data} editable newCardTemplate={<NewCard />} />
    })
  )
