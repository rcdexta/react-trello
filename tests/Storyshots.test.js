const initStoryshots = require('@storybook/addon-storyshots').default
const path = require('path')
import {render} from '@testing-library/react'

import 'jest-styled-components'
initStoryshots({
  framework: 'react', // Manually specify the project's framework
  configPath: path.join(__dirname, '..', '.storybook'),
  renderer: render
})
