import {addDecorator, configure} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'
import {withOptions} from '@storybook/addon-options'

addDecorator(
  withOptions({
    name: 'react-trello',
    url: 'https://github.com/rcdexta/react-trello',
    goFullScreen: false,
    showStoriesPanel: true,
    showSearchBox: false,
    addonPanelInRight: false,
    showAddonPanel: false
  })
)

addDecorator(
  withInfo({
    header: true,
    inline: false,
    source: true,
    propTables: false
  })
)

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
