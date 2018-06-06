'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Animated,
  Platform
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
}

const defaultProps = {
  activeOpacity: 1,
  animationDuration: 300,
  easing: 'linear',
  expanded: false,
  underlayColor: '#000',
  style: {}
}

class Accordion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
      height: new Animated.Value(0),
      content_height: 0
    };
  }

  toggle = () => {
    this.setState({ expanded: !this.state.expanded }); 
    let initialValue = this.state.expanded ? 0 : this.state.content_height;
    let finalValue = this.state.expanded ? this.state.content_height : 0;
    this.state.height.setValue(initialValue);
    Animated.timing(
      this.state.height,
      {
        toValue: finalValue,
        duration: this.props.animationDuration,
      }
    ).start();
  }

  _onPress = () => {
    this.toggle();

    if (this.props.onPress) {
      this.props.onPress.call(this);
    }
  }

  _getContentHeight = () => {
    if (this.refs.AccordionContent) {
      this.refs.AccordionContent.measure((ox, oy, width, height, px, py) => {
        // Sets content height in state
       
        this.setState({
          height: new Animated.Value(this.state.expanded ? height : 0),
          content_height: height
        });
      });
    }
  }

  componentDidMount() {
    // Gets content height when component mounts
    // without setTimeout, measure returns 0 for every value.
    // See https://github.com/facebook/react-native/issues/953
    setTimeout(this._getContentHeight);
  }

  componentWillReceiveProps() {
    this.state.height.setValue(0);
    this.setState({expanded: this.props.expanded});
  }

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
          style={{
            height: this.state.height._value,
            overflow: 'scroll'
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
};

Accordion.propTypes = propTypes;
Accordion.defaultProps = defaultProps;

module.exports = Accordion;
