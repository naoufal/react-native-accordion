'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tweenState from 'react-tween-state';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Platform,
  Animated
} from 'react-native';

const propTypes = {
  activeOpacity: PropTypes.number,
  animationDuration: PropTypes.number,
  content: PropTypes.element.isRequired,
  easing: PropTypes.string,
  expanded: PropTypes.bool,
  header: PropTypes.element.isRequired,
  onPress: PropTypes.func,
  underlayColor: PropTypes.string,
  style: PropTypes.object
};

const defaultProps = {
  activeOpacity: 1,
  animationDuration: 300,
  easing: 'linear',
  expanded: false,
  underlayColor: '#000',
  style: {}
};

class Accordion extends Component {
  state = {
    is_visible: false,
    height: new Animated.Value(0),
    content_height: 0
  };

  componentDidMount() {
    // Gets content height when component mounts
    // without setTimeout, measure returns 0 for every value.
    // See https://github.com/facebook/react-native/issues/953
    setTimeout(this._getContentHeight);
  }

  close = () => {
    this.state.is_visible && this.toggle();
  };

  open = () => {
    !this.state.is_visible && this.toggle();
  };

  toggle = () => {
    this.state.is_visible = !this.state.is_visible;

    Animated.timing(
      this.state.height,
      {
        toValue: this.state.height._value === 0 ? this.state.content_height : 0,
        duration: this.props.animationDuration,
      }
    ).start();
  };

  _onPress = () => {
    this.toggle();

    if (this.props.onPress) {
      this.props.onPress.call(this);
    }
  };

  _getContentHeight = () => {
    if (this.refs.AccordionContent) {
      this.refs.AccordionContent.measure((ox, oy, width, height, px, py) => {
        // Sets content height in state
        this.setState({
          height: new Animated.Value(this.props.expanded ? height : 0),
          content_height: height
        });
      });
    }
  };

  render() {
    return (
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
          {this.props.header({ isOpen: this.state.is_visible })}
        </TouchableHighlight>
        <Animated.View
          ref="AccordionContentWrapper"
          style={{
            height: this.state.height,
            overflow: 'scroll'
          }}
        >
          <View ref="AccordionContent">
            {(Platform.OS === 'ios' || this.state.is_visible) ? this.props.content : null}
          </View>
        </Animated.View>
      </View>
    );
  }
}

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

export default Accordion;
