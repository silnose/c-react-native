import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../../res/colors';

const CoinMarketItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.marketName}>{item.name}</Text>
      <Text style={styles.marketPrice}>{item.price_usd}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  marketName: {
    color: colors.white,
    fontWeight: 'bold',
  },
  marketPrice: {
    color: colors.white,
  },
});
export default CoinMarketItem;
