import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { App } from '../components';


storiesOf('react-kanban', module)
  .add('Default View', () => (
    <App/>
  ));
