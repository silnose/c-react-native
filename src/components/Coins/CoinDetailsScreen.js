import React from 'react';
import { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SectionList,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { colors } from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import MarketIcon from '../../assets/mobile_banking.png';
import Storage from '../../libs/storage';
import { API_BASE_URL, STORE_FAVORITE_KEY } from '../../utils/Constant';

export default class CoinDetailsScreen extends Component {
  state = { coin: {}, loading: false, markets: [], isFavorite: false };

  componentDidMount = async () => {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    this.getMarkets(coin.id);
    this.validateFavorite(coin.id);
    this.setState({ coin });
  };
  render() {
    const { coin, loading, markets, isFavorite } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerDetail}>
            <Image
              style={styles.coinImage}
              source={{ uri: this.getSymbolIcon(coin.nameid) }}
            />
            <Text style={styles.coinTitle}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toggleFavorites}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add favorite'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item} </Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.headerText}>{section.title}</Text>
            </View>
          )}></SectionList>
        <View style={styles.header}>
          <View style={styles.headerDetail}>
            <Image style={styles.coinImage} source={MarketIcon} />
            <Text style={styles.marketTitle}>Markets</Text>
          </View>
        </View>
        {loading && <ActivityIndicator color='red' size='large' />}
        <FlatList
          keyExtractor={(item) => item.id + item.name + item.price}
          style={styles.marketList}
          horizontal={true}
          data={markets}
          renderItem={({ item }) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
  getMarkets = async (coinID) => {
    this.setState({ loading: true });
    const response = await Http.instance.get(
      `${API_BASE_URL}/coin/markets/?id=${coinID}`
    );

    this.setState({ markets: response, loading: false });
  };
  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      const url = `https://c1.coinlore.com/img/25x25/${coinNameId}.png`;
      return url;
    }
  };
  getSections = (coin) => {
    const section = [
      { title: 'Market cap', data: [coin.market_cap_usd] },
      { title: 'Volume 24', data: [coin.volume24] },
      { title: 'Change 24', data: [coin.percent_change_24h] },
    ];
    return section;
  };
  toggleFavorites = () => {
    if (this.state.isFavorite) {
      this.removeFavoriteAlert();
    } else {
      this.addFavorite();
    }
  };
  addFavorite = async () => {
    const key = `${STORE_FAVORITE_KEY}${this.state.coin.id}`;
    const value = this.state.coin;
    const store = await Storage.instance.storeDataObject(key, value);
    if (store) {
      this.setState({ isFavorite: true });
    }
  };

  removeFavoriteAlert = () => {
    Alert.alert(
      `Remove From Favorites `,
      `Are you sure that you want to remove ${this.state.coin.name} from you favorites?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => this.removeFavorite(),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  removeFavorite = async () => {
    const key = `${STORE_FAVORITE_KEY}${this.state.coin.id}`;
    const favorite = await Storage.instance.remove(key);
    if (favorite) {
      this.setState({ isFavorite: false });
    }
  };
  validateFavorite = async (coinID) => {
    const key = `${STORE_FAVORITE_KEY}${coinID}`;
    const favoriteResult = await Storage.instance.getDataObject(key);
    if (favoriteResult) {
      this.setState({ isFavorite: true });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
  coinImage: {
    width: 25,
    height: 25,
  },
  coinTitle: {
    color: colors.white,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    maxHeight: 220,
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerDetail: {
    flexDirection: 'row',
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
  },
  sectionItem: { padding: 8 },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  headerText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketList: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitle: {
    color: colors.white,
    marginBottom: 16,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
});
