const initStoryshots = require('@storybook/addon-storyshots').default
initStoryshots({
  storyNameRegex: /^((?!.*?DontTest).)*$/
})
