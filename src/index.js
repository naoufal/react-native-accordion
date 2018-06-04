'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import tweenState from 'react-tween-state';
var createReactClass = require('create-react-class');

import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native';

var Accordion = createReactClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    activeOpacity: PropTypes.number,
    animationDuration: PropTypes.number,
    content: PropTypes.element.isRequired,
    easing: PropTypes.string,
    expanded: PropTypes.bool,
    header: PropTypes.element.isRequired,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
    style: PropTypes.object,
    contentHeight: PropTypes.number.isRequired
  },

  getDefaultProps() {
    return {
      activeOpacity: 1,
      animationDuration: 300,
      easing: 'linear',
      expanded: false,
      underlayColor: '#000',
      style: {}
    };
  },

  getInitialState() {
    return {
      is_visible: false,
      height: 0,
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
    this.tweenState('height', {
      easing: tweenState.easingTypes[this.props.easing],
      duration: this.props.animationDuration,
      endValue: this.state.height === 0 ? this.props.contentHeight : 0
    });
  },

  _onPress() {
    this.toggle();

    if (this.props.onPress) {
      this.props.onPress.call(this);
    }
  },

  _getContentHeight() {
    if (this.refs.AccordionContent) {
      this.refs.AccordionContent.measure((ox, oy, width, height, px, py) => {
        // Sets content height in state
        this.setState({
          height: this.props.expanded ? height : 0,
          content_height: height
        });
      });
    }
  },

  componentDidMount() {
    // Gets content height when component mounts
    // without setTimeout, measure returns 0 for every value.
    // See https://github.com/facebook/react-native/issues/953
    setTimeout(this._getContentHeight);
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
          <View>{this.props.header}</View>
        </TouchableHighlight>
        <View
          ref="AccordionContentWrapper"
          style={{
            height: this.getTweeningValue('height')
          }}
        >
          <View ref="AccordionContent">
            {this.props.content}
          </View>
        </View>
      </View>
      /*jshint ignore:end */
    );
  }
});

module.exports = Accordion;
