import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavScreen from './FavScreen';
import { colors } from '../../res/colors';
const Stack = createStackNavigator();

export default FavStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.blackPearl,
        shadowOpacity: 0,
        shadowColor: colors.blackPearl,
      },
      headerTintColor: colors.white,
    }}>
    <Stack.Screen name='Favorites' component={FavScreen}></Stack.Screen>
  </Stack.Navigator>
);
