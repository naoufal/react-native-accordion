'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  NavigatorIOS,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Accordion from 'react-native-accordion';
import { range } from 'lodash';

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

const AccordionList = React.createClass({
  getInitialState() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return {
      dataSource: ds.cloneWithRows(range(20)),
    };
  },

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  },

  _renderHeader() {
    return (
      <View style={{
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#f9f9f9',
      }}>
        <Text>Click to Expand</Text>
      </View>
    );
  },

  _renderContent() {
    return (
      <View style={{
        backgroundColor: '#31363D'
      }}>
        <Text style={{
          paddingTop: 15,
          paddingRight: 15,
          paddingBottom: 15,
          paddingLeft: 15,
          color: '#fff',
        }}>
          This content is hidden in the accordion
        </Text>
      </View>
    );
  },

  _renderRow(rowData) {
    return (
      <Accordion
        header={this._renderHeader()}
        content={this._renderContent()}
        duration={300}
        easing="easeOutCubic"
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('AccordionExample', () => AccordionExample);
