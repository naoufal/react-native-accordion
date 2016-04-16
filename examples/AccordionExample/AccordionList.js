'use strict';

import React, {
  ListView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Accordion from 'react-native-accordion';
import { range } from 'lodash';

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

module.exports = AccordionList;
