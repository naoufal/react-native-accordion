'use strict';

import React, { PropTypes } from 'react';
import {
  TouchableHighlight,
  View,
  Animated,
  Easing
} from 'react-native';

const Accordion = React.createClass({
  propTypes: {
    activeOpacity: PropTypes.number,
    animationDuration: PropTypes.number,
    content: PropTypes.element.isRequired,
    easing: PropTypes.func,
    expanded: PropTypes.bool,
    header: PropTypes.element.isRequired,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
    style: PropTypes.object
  },

  getDefaultProps() {
    return {
      activeOpacity: 1,
      animationDuration: 300,
      easing: Easing.linear,
      expanded: false,
      underlayColor: '#000',
      style: {}
    };
  },

  getInitialState() {
    return {
      is_visible: false,
      height: null,
      content_height: 0
    };
  },

  close() {
    this.state.is_visible && this.toggle();
  },

  open() {
    !this.state.is_visible && this.toggle();
  },

  toggle() {
    this.state.is_visible = !this.state.is_visible;
    Animated.timing(
      this.state.height,
      {
        toValue: this.state.is_visible ? this.state.content_height : 0,
        duration: this.props.animationDuration,
        easing: this.props.easing
      }
    ).start();
  },

  _onPress() {
    this.toggle();

    if (this.props.onPress) {
      this.props.onPress.call(this);
    }
  },

  _getContentHeight(event) {
    const height = event.nativeEvent.layout.height;
    if (this.state.content_height === 0) {
      this.setState({
        content_height: height
      });
      this.state.height = new Animated.Value(0);
      this.state.height.setValue(this.props.expanded ? height : 0);
    }
  },

  render() {
    return (
      /*jshint ignore:start */
      <View
        style={{
          overflow: 'hidden'
        }}
      >
        <TouchableHighlight
          ref="AccordionHeader"
          onPress={this._onPress}
          underlayColor={this.props.underlayColor}
          style={this.props.style}
        >
          {this.props.header}
        </TouchableHighlight>
        <Animated.View
          ref="AccordionContentWrapper"
          onLayout={(event) => this._getContentHeight(event)}
          style={{
            height: this.state.height
          }}
        >
          <View ref="AccordionContent">
            {this.props.content}
          </View>
        </Animated.View>
      </View>
      /*jshint ignore:end */
    );
  }
});

module.exports = Accordion;
