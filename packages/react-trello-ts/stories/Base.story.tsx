// import React from 'react'
// import {storiesOf} from '@storybook/react'

import Board from '../src'

import data from './data/base.json'

// storiesOf('Basic Functions', module).add('Full Board example', () => <Board data={data} />, {
//   info: 'A complete Trello board with multiple lanes fed as json data'
// })

// Button.stories.ts|tsx

import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'
// import {Board} from './../src/controllers/Board'
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Basic Functions',
  component: Board
} as ComponentMeta<typeof Board>

export const Primary: ComponentStory<typeof Board> = () => <Board data={data} />
