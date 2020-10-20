import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { colors } from '../../res/colors';
import FavEmptyState from './FavEmptyState';
import Storage from '../../libs/storage';
import CoinItem from '../Coins/CoinItem';
import { COIN_DETAILS_NAVIGATION } from '../../utils/Constant.js';

export default class FavScreen extends Component {
  state = {
    favorites: [],
  };
  componentDidMount = async () => {
    this.props.navigation.addListener('focus', this.getFavorites);
  };
  componentWillUnmount = () => {
    this.props.navigation.removeListener('focus', this.getFavorites);
  };
  render() {
    const { favorites } = this.state;
    return (
      <View style={styles.container}>
        {favorites.length === 0 && <FavEmptyState />}
        <FlatList
          keyExtractor={(item) => item.id + item.name + item.price}
          data={favorites}
          renderItem={({ item }) => (
            <CoinItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
  getFavorites = async () => {
    const favoritesKeys = await Storage.instance.getAllData();
    const favoritesValue = await Storage.instance.getMultiData(favoritesKeys);
    const favorites = favoritesValue.map((item) => JSON.parse(item[1]));
    this.setState({ favorites });
  };
  handlePress = (coin) => {
    this.props.navigation.navigate(COIN_DETAILS_NAVIGATION, { coin });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
});
