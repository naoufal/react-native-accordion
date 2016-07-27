'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StatusBarIOS
} from 'react-native';

import AccordionList from './AccordionList';

class AccordionExample extends Component {
  componentDidMount() {
    StatusBarIOS.setStyle("light-content");
  }

  render() {
    return (
      <NavigatorIOS
        style={{ flex: 1 }}
        initialRoute={{
          component: AccordionList,
          title: 'react-native-accordion',
        }}
        barTintColor="#0391D7"
        titleTextColor="#fff"
      />
    );
  }
}

AppRegistry.registerComponent('AccordionExample', () => AccordionExample);
