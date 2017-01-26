import { configure } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

setOptions({
  name: 'react-kanban',
  url: 'https://github.com/rcdexta/react-kanban',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false,
});

function loadStories () {
  require('../stories/App.story');
}

configure(loadStories, module);
