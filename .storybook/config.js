import {configure} from '@storybook/react'
import {setOptions} from '@storybook/addon-options'
import {setDefaults} from '@storybook/addon-info'

setOptions({
  name: 'react-trello',
  url: 'https://github.com/rcdexta/react-trello',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false
})

setDefaults({
  header: true,
  inline: false,
  source: true,
  propTables: false
})

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
