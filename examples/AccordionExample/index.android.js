'use strict';
import React, {Component} from 'react';
import {
  AppRegistry
} from 'react-native';

import AccordionList from './AccordionList';

class AccordionExample extends Component {
  render() {
    return <AccordionList />;
  }
}

AppRegistry.registerComponent('AccordionExample', () => AccordionExample);
