import React, { Component } from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/base.json')

class NewCardForm extends Component {
  handleAdd = () => this.props.onAdd({title: this.titleRef.value, description: this.descRef.value})
  setTitleRef = (ref) => this.titleRef = ref
  setDescRef = (ref) => this.descRef = ref
  render() {
    const {onCancel} = this.props
    return (
      <div style={{background: 'white', borderRadius: 3, border: '1px solid #eee', borderBottom: '1px solid #ccc'}}>
        <div style={{padding: 5, margin: 5}}>
          <div>
            <div style={{marginBottom: 5}}>
              <input type="text" ref={this.setTitleRef} placeholder="Title" />
            </div>
            <div style={{marginBottom: 5}}>
              <input type="text" ref={this.setDescRef} placeholder="Description" />
            </div>
          </div>
          <button onClick={this.handleAdd}>Add</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
  }
}

storiesOf('Custom Components', module)
  .add(
    'NewCardForm',
    () => <Board data={data} editable components={{NewCardForm: NewCardForm}} />
    , {info: 'Pass a custom new card form compoment to add card'}
  )

