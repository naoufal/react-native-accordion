'use strict';
import React, {
  AppRegistry,
  Component
} from 'react-native';

import AccordionList from './AccordionList';

class AccordionExample extends Component {
  render() {
    return <AccordionList />;
  }
}

AppRegistry.registerComponent('AccordionExample', () => AccordionExample);
