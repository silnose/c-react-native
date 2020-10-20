import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors } from '../../res/colors';

const FavEmptyState = () => (
  <View style={styles.container}>
    <Text style={styles.text}>No Favorites Available..</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FavEmptyState;
