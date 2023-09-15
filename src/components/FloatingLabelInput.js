import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;

    // Calculate the top value based on whether the input has a value or is focused
    const topValue = !isFocused && !props.value ? 10 : 0;

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: topValue,
      fontSize: !isFocused ? 20 : 14,
      color: !isFocused ? '#aaa' : '#fff',
    };

    return (
      <View style={{ paddingTop: 18 }}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          {...props}
          style={{ height: 26, fontSize: 20, color: '#fff' }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}
