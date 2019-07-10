import React, { Component } from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/data-sort.json')

class NewLaneForm extends Component {
  render () {
    const {onCancel, t} = this.props
    const handleAdd = () => this.props.onAdd({title: this.inputRef.value})
    const setInputRef = (ref) => this.inputRef = ref
    return (
      <div>
        <input ref={setInputRef} placeholder={t('placeholder.title')} autoFocus/>
        <button onClick={handleAdd}>{t('button.Add lane')}</button>
        <button onClick={onCancel}>{t('button.Cancel')}</button>
      </div>
    )
  }
}

storiesOf('Custom Components', module)
  .add('NewLaneForm', () => <Board editable canAddLanes components={{NewLaneForm: NewLaneForm}} data={data} />)
