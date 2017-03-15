'use strict';

import React, { PropTypes } from 'react';
import tweenState from 'react-tween-state';

import {
    StyleSheet,
    TouchableHighlight,
    View,
    Text
} from 'react-native';

var _ = require('lodash');

var Accordion = React.createClass({
    mixins: [tweenState.Mixin],

    propTypes: {
        activeOpacity: React.PropTypes.number,
        animationDuration: React.PropTypes.number,
        content: React.PropTypes.element.isRequired,
        easing: React.PropTypes.string,
        expanded: React.PropTypes.bool,
        header: React.PropTypes.element.isRequired,
        headerOpen: React.PropTypes.element,
        onPress: React.PropTypes.func,
        underlayColor: React.PropTypes.string,
        style: React.PropTypes.object,
        styleOpen: React.PropTypes.object,
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
            is_visible: this.props.expanded,
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
            endValue: this.state.height === 0 ? this.state.content_height : 0,
            onEnd: () => {this.props.onEnd && this.props.onEnd()}
        });
    },

    _onPress() {
        this.toggle();

        if (this.props.onPress) {
            this.props.onPress.call(this);
        }
    },

    _onLongPress() {
        if (this.props.onLongPress) {
            this.props.onLongPress.call(this);
        }
    },

    _getContentHeight(onlyOpen = false) {
        if (this.refs.AccordionContent) {
            this.refs.AccordionContent.measure((ox, oy, width, height, px, py) => {
                // Sets content height in state
                if(onlyOpen)
                {
                    this.setState({
                        height: height,
                        content_height: height
                    });
                }
                else
                {
                    this.setState({
                        height: this.props.expanded ? height : 0,
                        content_height: height
                    });
                }

            });
        }
    },

    componentWillReceiveProps(nextProps) {
        // Recalculate the height only if the Accordion is open
        if(!this.state.is_visible)
        {
            setTimeout(this._getContentHeight);
        }
    },


    /**
     * Check if our accordion has received new content (children). If yes, and the current item is
     * open recalculate the height of that open item
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState) {
        if(this.state.is_visible && !_.isEqual(prevProps.content, this.props.content)){
            setTimeout(() => this._getContentHeight(true));
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
                    onLongPress={this._onLongPress}
                    underlayColor={this.props.underlayColor}
                    style={this.state.is_visible ? this.props.styleOpen : this.props.style}
                >
                    {this.state.is_visible && this.props.headerOpen ? this.props.headerOpen : this.props.header}
                </TouchableHighlight>
                <View
                    ref="AccordionContentWrapper"
                    style={{
                        height: this.getTweeningValue('height'),
                        overflow: 'scroll'
                    }}
                    onLayout={()=>{}}
                >
                    <View ref="AccordionContent" onLayout={()=>{}}>
                        {this.props.content}
                    </View>
                </View>
            </View>
            /*jshint ignore:end */
        );
    }
});

module.exports = Accordion;
