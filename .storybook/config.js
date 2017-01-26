import { configure, setAddon } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';
import infoAddon, { setDefaults } from '@kadira/react-storybook-addon-info';

setOptions({
  name: 'react-kanban',
  url: 'https://github.com/rcdexta/react-kanban',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false,
});

setDefaults({ header: false, inline: true, propTables: false });
setAddon(infoAddon)

function loadStories () {
  require('../stories/App.story');
}

configure(loadStories, module);
