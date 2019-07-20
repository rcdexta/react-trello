import React, {Component} from 'react'
import {storiesOf} from '@storybook/react'

import Board from '../src'

const data = require('./data/base.json')

storiesOf('Advanced Features', module).add('Vertical board', () => <Board data={data} orientation='vertical' />, {info: 'Allow the board to display in a vertical'})
