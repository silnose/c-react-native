import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailsScreen from './CoinDetailsScreen';
import { colors } from '../../res/colors';
import { COIN_DETAILS_NAVIGATION } from '../../utils/Constant.js';

const Stack = createStackNavigator();

export default CoinsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.blackPearl,
        shadowOpacity: 0,
        shadowColor: colors.blackPearl,
      },
      headerTintColor: colors.white,
    }}>
    <Stack.Screen name='Coins' component={CoinsScreen}></Stack.Screen>
    <Stack.Screen
      name={COIN_DETAILS_NAVIGATION}
      component={CoinDetailsScreen}></Stack.Screen>
  </Stack.Navigator>
);
