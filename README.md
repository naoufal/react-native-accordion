# React Native Accordion
[![npm](https://img.shields.io/npm/v/react-native-accordion.svg?style=flat-square)](https://www.npmjs.com/package/react-native-accordion)
[![npm downloads](https://img.shields.io/npm/dm/react-native-accordion.svg?style=flat-square)](https://www.npmjs.com/package/react-native-accordion)
[![Code Climate](https://img.shields.io/codeclimate/github/naoufal/react-native-accordion.svg?style=flat-square)](https://codeclimate.com/github/naoufal/react-native-accordion)

__`react-native-accordion`__ is an easy to use Accordion component for [React Native](https://facebook.github.io/react-native/) app.

![accordion](https://cloud.githubusercontent.com/assets/1627824/7762243/801c1e46-ffff-11e4-9a36-2183704b6ec6.gif)

## Install
```shell
npm i --save react-native-accordion
```

## Usage
Using an Accordion in your app will usually look like this:
```js
var Accordion = require('react-native-accordion');

var YourComponent = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(_.range(25)),
    };
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow() {
    var header = (
      <View style={...}>
        <Text>Click to Expand</Text>
      </View>
    );

    var content = (
      <View style={...}>
        <Text>This content is hidden in the accordion</Text>
      </View>
    );

    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
      />
    );
  }
});
```

## Examples
Here are a few examples of how you can use an accordion in your app:

|Transit App|Tweetbot|
|---|---|
|[![accordion-transit](https://cloud.githubusercontent.com/assets/1627824/7757509/ffee4358-ffd0-11e4-9fc5-13c8d6f09ad0.gif)](https://itunes.apple.com/ca/app/transit-app-real-time-bus/id498151501)|[![accordion-tweetbot](https://cloud.githubusercontent.com/assets/1627824/7757570/6b391106-ffd1-11e4-9191-e501e81ca506.gif)](https://itunes.apple.com/ca/app/tweetbot-3-for-twitter.-elegant/id722294701)|

## Props
The following props can be used to modify the Accordion's style and/or behaviour:

| Prop | Type | Opt/Required | Default | Note |
|---|---|---|---|---|
|__`activeOpacity`__|_Number_|Optional|`1`|The active opacity of the [TouchableHighlight](https://facebook.github.io/react-native/docs/touchablehighlight.html).
|__`animationDuration`__|_Number_|Optional|`300`|The duration of the animation.
|__`content`__|_Element_|Required|`N/A`|The content you want hidden in the collapse accordion.
|__`easing`__|_String_|Optional|`linear`| A tweening function from [tween-functions](https://github.com/chenglou/tween-functions).
|__`expanded`__|_Boolean_|Optional|`false`|If the accordion is expanded by default when mounted.
|__`header`__|_Element_|Required|`N/A`|The element that will expand the accordion when pressed.
|__`onPress`__|_Function_|Optional|`N/A`|A function that will be called when the accordion is pressed.
|__`underlayColor`__|_String_|Optional|`#000`|The underlay color of the [TouchableHighlight](https://facebook.github.io/react-native/docs/touchablehighlight.html).
|__`style`__|_Object_|Optional|`{}`|The styles you want to set on the accordion element.

## Methods
The following methods can be used to open and close the accordion:

| Method | Parameters | Note |
|---|---|---|
|__`open`__|`N/A`|Open the accordion.
|__`close`__|`N/A`|Close the accordion.
|__`toggle`__|`N/A`|Toggle the accordion.

## License
Copyright (c) 2015, [Naoufal Kadhom](http://naoufal.com)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
