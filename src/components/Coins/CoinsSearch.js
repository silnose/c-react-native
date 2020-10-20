import React, { Component } from 'react';
import { TextInput, Platform, StyleSheet, View } from 'react-native';
import { colors } from '../../res/colors';

export default class CoinsSearch extends Component {
  state = { query: '' };
  render() {
    const { query } = this.state;
    return (
      <View>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS == 'ios'
              ? styles.textInputIOS
              : styles.textInputAndroid,
          ]}
          onChangeText={this.handleOnChangeText}
          value={query}
          placeholder='Search Coin...'
          placeholderTextColor={colors.white}
        />
      </View>
    );
  }
  handleOnChangeText = (query) => {
    this.setState({ query });
    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});
