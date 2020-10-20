import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import { colors } from '../../res/colors';
import ArrowDown from '../../assets/arrow_down.png';
import ArrowUp from '../../assets/arrow_up.png';
const CoinItem = ({ item, onPress }) => {
  const icon = item.percent_change_1h > 0 ? ArrowUp : ArrowDown;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.coinSymbol}>{item.symbol}</Text>
        <Text style={styles.coinText}>{item.name}</Text>
        <Text style={styles.coinUsd}>{`USD$ ${Number.parseFloat(
          item.price_usd
        ).toFixed(2)} `}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.coinPercentChange}>{item.percent_change_1h}</Text>
        <Image source={icon} style={styles.coinArrowImage} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  coinSymbol: {
    color: colors.white,
    fontWeight: 'bold',
    marginRight: 12,
    fontSize: 14,
  },
  coinText: {
    color: colors.white,
    fontSize: 12,
    marginRight: 10,
  },
  coinUsd: {
    color: colors.white,
    fontSize: 12,
  },
  coinPercentChange: {
    color: 'red',
    fontSize: 12,
  },
  coinArrowImage: {
    width: 15,
    height: 15,
  },
});
export default CoinItem;
