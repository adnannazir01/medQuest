import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {TabScreens} from '../data';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabNavigatorParamList, tabBarIconType} from './types.navigation';
import {COLORS, CustomTheme, Globaltypography} from '../theme';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

// function for tab bar icon redering
const TabBarIconFunc = ({color, size, item, focused}: tabBarIconType) => {
  return <item.tabBarIcon {...(focused && {fill:color})}  width={size} heigth={size} />;
};

const BottomTab = (): JSX.Element => {
  /*
   ** Hooks
   */
  const insets = useSafeAreaInsets();
  const {colors} = useTheme() as CustomTheme;

  return (
    <Tab.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary1,
        tabBarInactiveTintColor: colors.Nevada,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [styles.tabBarStyle, {height: insets.bottom + 80, backgroundColor: colors.background}],

        // tabBarItemStyle: $tabBarItem,
      }}>
      {TabScreens.map((item, index) => (
        <Tab.Screen
          key={`index-${index}`}
          name={item.name as keyof BottomTabNavigatorParamList}
          component={item.component}
          options={{
            tabBarIcon: ({color, size, focused}) => TabBarIconFunc({color, size, item, focused}),
            tabBarLabel: item.tabBarLabel,
            tabBarLabelStyle: styles.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    ...Globaltypography.formLabel,
    marginBottom: 20
  },
  tabBarStyle: {
    shadowColor: COLORS.palette.black,
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    borderTopColor: COLORS.transparent,
    borderTopWidth: 0
  },
});

export default BottomTab;
