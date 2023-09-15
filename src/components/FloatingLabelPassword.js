import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default class FloatingLabelPassword extends Component {
  state = {
    isFocused: false,
    isPasswordVisible: false,
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  togglePasswordVisibility = () =>
    this.setState((prevState) => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));

  render() {
    const { label, ...props } = this.props;
    const { isFocused, isPasswordVisible } = this.state;

    // Calculate the top value based on whether the input has a value or is focused
    const topValue = !isFocused && !props.value ? 10 : 0;

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: topValue,
      fontSize: !isFocused ? 20 : 14,
      color: !isFocused ? '#aaa' : '#fff',
    };

    // Define the image source based on isPasswordVisible state
    const imageUrl = isPasswordVisible ? require('../../assets/interface/Hide.png') : require('../../assets/interface/Show.png');

    return (
      <View style={{ paddingTop: 18 }}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          {...props}
          style={{ height: 26, fontSize: 20, color: '#fff' }}
          secureTextEntry={!isPasswordVisible}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <TouchableOpacity onPress={this.togglePasswordVisibility}>
          <Image style={{resizeMode:"center",position:"absolute",right:0,bottom:0}} source={imageUrl} />
        </TouchableOpacity>
      </View>
    );
  }
}
