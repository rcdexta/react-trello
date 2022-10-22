const config = {
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  stories: ['../stories/**/*.story.@(js|tsx|mdx)'],
  webpackFinal: async (config, {configType}) => {
    // Make whatever fine-grained changes you need
    // Return the altered config

    return config
  },
  features: {
    babelModeV7: true
  },
  core: {
    builder: 'webpack5'
  }
}
module.exports = config
