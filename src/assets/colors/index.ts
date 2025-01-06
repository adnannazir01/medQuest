// import {Appearance} from 'react-native';
// import DarkColor from './DarkColor';
import LightColor from './LightColor';

/*
 ** checking for app theme
 */
const getCurrentThemeColors = () => {
  // const currentTheme = Appearance.getColorScheme();
  // return currentTheme === 'dark' ? DarkColor : LightColor;
  return LightColor;
};

export default getCurrentThemeColors();
