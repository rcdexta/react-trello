import React, { Component } from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/base.json')

class NewCardForm extends Component {
  render() {
    const {onCancel} = this.props
    const handleAdd = () => this.props.onAdd({title: this.titleRef.value, desc: this.descRef.value})
    const setTitleRef = (ref) => this.titleRef = ref
    const setDescRef = (ref) => this.descRef = ref
    return (
      <div style={{background: 'white', borderRadius: 3, border: '1px solid #eee', borderBottom: '1px solid #ccc'}}>
        <div style={{padding: 5, margin: 5}}>
          <div>
            <div style={{marginBottom: 5}}>
              <input type="text" ref={setTitleRef} placeholder="Title" />
            </div>
            <div style={{marginBottom: 5}}>
              <input type="text" ref={setDescRef} placeholder="Description" />
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
    'Custom NewCardForm',
    () => <Board data={data} editable components={{NewCardForm: NewCardForm}} />
    , {info: 'Pass a custom new card form compoment to add card'}
  )

