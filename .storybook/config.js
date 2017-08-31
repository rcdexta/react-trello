import { configure } from '@storybook/react';
// import { setOptions } from '@kadira/storybook-addon-options';

// setOptions({
//   name: 'react-trello',
//   url: 'https://github.com/rcdexta/react-trello',
//   goFullScreen: false,
//   showLeftPanel: true,
//   showDownPanel: false,
//   showSearchBox: false,
//   downPanelInRight: false,
// });

// setDefaults({ header: true, inline: false, propTables: false });

function loadStories () {
  require('../stories');
}

configure(loadStories, module);
