'use strict';

var React = require('react-native');
var tweenState = require('react-tween-state');

var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} = React;

var Accordion = React.createClass({
  mixins: [tweenState.Mixin],

  propTypes: {
    activeOpacity: React.PropTypes.number,
    animationDuration: React.PropTypes.number,
    content: React.PropTypes.element.isRequired,
    easing: React.PropTypes.string,
    header: React.PropTypes.element.isRequired,
    underlayColor: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      activeOpacity: 1,
      animationDuration: 300,
      easing: 'linear',
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

  _toggleAccordion() {
    this.state.is_visible = !this.state.is_visible;

    this.tweenState('height', {
      easing: tweenState.easingTypes[this.props.easing],
      duration: this.props.animationDuration,
      endValue: this.state.height === 0 ? this.state.content_height : 0
    });
  },

  _getContentHeight() {
    this.refs.AccordionContent.measure((ox, oy, width, height, px, py) => {
      // Sets content height in state
      this.setState({content_height: height});
    });
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
          onPress={this._toggleAccordion}
          underlayColor={this.props.underlayColor}
          style={this.props.style}
        >
          {this.props.header}
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
