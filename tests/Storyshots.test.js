const initStoryshots = require('@storybook/addon-storyshots').default
import 'jest-styled-components'
initStoryshots({
  storyNameRegex: /^((?!.*?DontTest).)*$/
})
