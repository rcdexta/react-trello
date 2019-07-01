import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

import './board.css'

const data = require('./data/base.json')

const CustomLaneHeader = props => {
  const buttonHandler = () => {
    alert(`The label passed to the lane was: ${props.label}. The lane has ${props.cards.length} cards!`)
  }
  return (
    <div>
      <header
        style={{
          borderBottom: '2px solid #c5c5c5',
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <div style={{fontSize: 14, fontWeight: 'bold'}}>{props.title}</div>
        {props.label && (
          <div style={{width: '30%', textAlign: 'right', fontSize: 13}}>
            <button onClick={buttonHandler} style={{cursor: 'pointer'}}>
              ?
            </button>
          </div>
        )}
      </header>
    </div>
  )
}

class NewCard extends Component {
  updateField = (field, evt) => {
    this.setState({[field]: evt.target.value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  render() {
    const {onCancel} = this.props
    return (
      <div style={{background: 'white', borderRadius: 3, border: '1px solid #eee', borderBottom: '1px solid #ccc'}}>
        <div style={{padding: 5, margin: 5}}>
          <div>
            <div style={{marginBottom: 5}}>
              <input type="text" onChange={evt => this.updateField('title', evt)} placeholder="Title" />
            </div>
            <div style={{marginBottom: 5}}>
              <input type="text" onChange={evt => this.updateField('description', evt)} placeholder="Description" />
            </div>
          </div>
          <button onClick={this.handleAdd}>Add</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
  }
}
const CustomCard = props => {
  return (
    <div style={{padding: 6}}>
      <header
        style={{
          borderBottom: '1px solid #eee',
          paddingBottom: 6,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: props.cardColor
        }}>
        <div style={{fontSize: 14, fontWeight: 'bold'}}>{props.name}</div>
        <div style={{fontSize: 11}}>{props.dueOn}</div>
      </header>
      <div style={{fontSize: 12, color: '#BD3B36'}}>
        <div style={{color: '#4C4C4C', fontWeight: 'bold'}}>{props.subTitle}</div>
        <div style={{padding: '5px 0px'}}>
          <i>{props.body}</i>
        </div>
        <div style={{marginTop: 10, textAlign: 'center', color: props.cardColor, fontSize: 15, fontWeight: 'bold'}}>{props.escalationText}</div>
        {props.tags && (
          <div
            style={{
              borderTop: '1px solid #eee',
              paddingTop: 6,
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}>
            {props.tags.map(tag => (
              <Tag key={tag.title} {...tag} tagStyle={props.tagStyle} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
storiesOf('Deprecation warnings', module).add(
  'v2.2 warnings',
  () => <Board
          data={data}
          editable
					addCardLink={<button>New Card</button>}
					customLaneHeader={<CustomLaneHeader />}
					newLaneTemplate={<div>new lane</div>}
					newCardTemplate={<NewCard />}
					customCardLayout
					>
				 <CustomCard />
				</Board>,
  {info: 'Example of usage legacy props: addCardLink, customCardLayout, customLaneHeader, newLaneTemplate, newCardTemplate'}
)
