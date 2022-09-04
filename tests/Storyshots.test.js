const initStoryshots = require('@storybook/addon-storyshots').default
import 'jest-styled-components'
const path = require('path')
import {render} from '@testing-library/react'

initStoryshots({
  framework: 'react', // Manually specify the project's framework
  configPath: path.join(__dirname, '..', '.storybook'),
  renderer: render
})
