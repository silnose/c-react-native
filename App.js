import React from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/Coins/CoinsStack';
import { colors } from './src/res/colors';
import coinTabCoinIcon from '../cryptoTraker/src/assets/bank.png';
import coinTabFavIcon from '../cryptoTraker/src/assets/star.png';
import FavStack from './src/components/favorites/FavStack';
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tabs.Navigator
          tabBarOptions={{
            tintColor: colors.zircon,
            style: { backgroundColor: colors.blackPearl },
            activeTintColor: colors.white,
          }}>
          <Tabs.Screen
            name='coins'
            component={CoinsStack}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Image
                  style={{ tintColor: color, width: size, height: size }}
                  source={coinTabCoinIcon}
                />
              ),
            }}
          />

          <Tabs.Screen
            name='favorites'
            component={FavStack}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Image
                  style={{ tintColor: color, width: size, height: size }}
                  source={coinTabFavIcon}
                />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    textAlign: 'center',
  },
});
