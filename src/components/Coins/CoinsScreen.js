import React, { Component } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Http from '../../libs/http';
import { colors } from '../../res/colors';
import CoinItem from './CoinItem';
import CoinsSearch from './CoinsSearch';
import { API_BASE_URL, COIN_DETAILS_NAVIGATION } from '../../utils/Constant.js';

export default class CoinsScreen extends Component {
  state = { coins: [], allCoins: [], loading: false };
  componentDidMount = async () => {
    this.getTickets();
  };
  render() {
    const { coins, loading } = this.state;
    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch} />
        {loading && (
          <ActivityIndicator color='red' size='large' style={styles.loader} />
        )}
        <FlatList
          data={coins}
          renderItem={({ item }) => (
            <CoinItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
  getTickets = async () => {
    this.setState({ loading: true });
    const response = await Http.instance.get(`${API_BASE_URL}/tickers`);
    this.setState({
      coins: response.data,
      allCoins: response.data,
      loading: false,
    });
  };

  handlePress = (coin) => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate(COIN_DETAILS_NAVIGATION, { coin });
  };

  handleSearch = (query) => {
    const { allCoins } = this.state;
    if (query && query !== '') {
      const coinsFiltered = allCoins.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLowerCase())
        );
      });
      this.setState({ coins: coinsFiltered });
    } else {
      this.setState({ coins: allCoins });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  titleText: {
    color: colors.white,
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});
