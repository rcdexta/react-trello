import React from 'react'
import {withInfo} from '@storybook/addon-info'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data.json')

storiesOf('Editable Board', module).add(
  'Add/Delete Cards',
  withInfo('Add/delete cards or delete lanes')(() => {

		const shouldReceiveNewData = nextData => {
			console.log('Board has changed')
			console.log(nextData)
		}

    return (
      <Board
        data={data}
				onDataChange={shouldReceiveNewData}
        editable
      />
    )
  })
)
