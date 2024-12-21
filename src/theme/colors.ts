import {Theme} from '@react-navigation/native';
import {Appearance, FlexAlignType, StyleSheet} from 'react-native';
/*
 ** Default colors
 */
const defaultPalette = {
  neutral100: '#f5fff8',
  neutral200: '#d6ffd8',
  neutral300: '#b7ffb9',
  neutral400: '#98ff9a',
  neutral500: '#7aff7a',
  neutral600: '#60e460',
  neutral700: '#47cc47',
  neutral800: '#2eb32e',

  primary000: '#EAF3FF',
  primary100: '#D4E6F2',
  primary200: '#80a8f7',
  primary300: '#4071e6',
  primary400: '#1c47cc',
  primary500: '#0d2eab',
  primary600: '#064aac',
  primary700: '#053c93',

  secondary000: '#D0D0D0',
  secondary100: '#a6a6a6',
  secondary200: '#7a7a7a',
  secondary300: '#5e5e5e',
  secondary400: '#424242',
  secondary500: '#4f4f4f',
  secondary600: '#383838',
  secondary700: '#787878',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',
  accent600: '#F2C94C',

  angry100: '#F2D6CD',
  angry500: '#EB5757',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
  overlay100: 'rgba(6, 74, 172, 0.1)',

  white: '#ffffff',
  black: '#000000',
} as const;
/*
 ** Dark Color theme
 */
const darkPalette = {
  neutral100: '#1e291e',
  neutral200: '#273427',
  neutral300: '#314131',
  neutral400: '#3a4d3a',
  neutral500: '#445944',
  neutral600: '#4e664e',
  neutral700: '#588258',
  neutral800: '#639f63',

  primary000: '#0d2eab',
  primary100: '#1c47cc',
  primary200: '#4071e6',
  primary300: '#80a8f7',
  primary400: '#d4e6f2',
  primary500: '#EAF3FF',
  primary600: '#f0f7ff',
  primary700: '#f5faff',

  secondary000: '#383838',
  secondary100: '#424242',
  secondary200: '#5e5e5e',
  secondary300: '#7a7a7a',
  secondary400: '#a6a6a6',
  secondary500: '#D0D0D0',
  secondary600: '#dbdbdb',
  secondary700: '#e6e6e6',

  accent100: '#5a3c00',
  accent200: '#6b4a00',
  accent300: '#7b5900',
  accent400: '#8c6700',
  accent500: '#9d7600',
  accent600: '#b98a00',

  angry100: '#8b3a36',
  angry500: '#FF6B6B',

  overlay20: 'rgba(230, 230, 230, 0.2)',
  overlay50: 'rgba(230, 230, 230, 0.5)',
  overlay100: 'rgba(240, 240, 240, 0.1)',

  white: '#ffffff',
  black: '#000000',
} as const;

export const DEFAULT_COLORS = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */

  primary1: '#023F88',
  secondary: '#D5DCE5',
  inputColor: '#F2F3F3',
  Ebony: '#1D262B',
  Nevada: '#5C6970',
  SeaBuckthorn: '#F78D26',
  palette: defaultPalette,
  /*
   ** Primary color user in app
   */
  primary: defaultPalette.primary600,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: defaultPalette.secondary500,
  /**
   * Secondary text information.
   */
  textDim: defaultPalette.secondary100,
  /**
   * The default color of the screen background.
   */
  background: '#FAFAFA',
  /**
   * The default color for header
   */
  header: darkPalette.primary700,
  /**
   * The default color of the button
   */
  card: defaultPalette.secondary400,
  /**
   * The default color of the button
   */
  button: defaultPalette.primary600,
  /**
   * The default color of the button border
   */
  buttonBorder: defaultPalette.primary600,
  /**
   * The default color of the button light
   */
  buttonLight: defaultPalette.primary100,
  /**
   * The default color of the button light
   */
  buttonTextPrimary: defaultPalette.white,
  /**
   * The default color of the button light
   */
  buttonTextSeconday: defaultPalette.secondary500,
  /*
   ** Default Status bar color
   */
  statusBar: defaultPalette.secondary000,
  /*
   ** Default loader color
   */
  loaderPrimary: defaultPalette.primary600,
  /*
   ** Default loader color
   */
  loaderSecondary: defaultPalette.secondary500,
  /**
   * The default border color.
   */
  border: defaultPalette.secondary000,
  /**
   * The main tinting color.
   */
  tint: defaultPalette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: defaultPalette.neutral400,
  /**
   * The default color of the notification.
   */
  notification: defaultPalette.accent400,
  /**
   * Error messages.
   */
  error: defaultPalette.angry500,
  /**
   * Error Background.
   */
  errorBackground: defaultPalette.angry100,
};

export const DARK_COLORS = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  primary1: '#023F88',
  secondary: '#D5DCE5',
  inputColor: '#F2F3F3',
  Ebony: '#1D262B',
  Nevada: '#5C6970',
  SeaBuckthorn: '#F78D26',
  palette: darkPalette,
  /*
   ** Primary color user in app
   */
  primary: darkPalette.primary400,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: darkPalette.secondary200,
  /**
   * Secondary text information.
   */
  textDim: darkPalette.secondary100,
  /**
   * The default color of the screen background.
   */
  background: '#FAFAFA',
  /**
   * The default color for header
   */
  header: darkPalette.primary700,
  /**
   * The default color of the button
   */
  card: darkPalette.secondary400,
  /**
   * The default color of the button
   */
  button: darkPalette.primary600,
  /**
   * The default color of the button border
   */
  buttonBorder: darkPalette.primary600,
  /**
   * The default color of the button light
   */
  buttonLight: darkPalette.primary100,
  /**
   * The default color of the button light
   */
  buttonTextPrimary: defaultPalette.secondary200,
  /**
   * The default color of the button light
   */
  buttonTextSeconday: defaultPalette.secondary500,
  /*
   ** Default Status bar color
   */
  statusBar: darkPalette.secondary000,
  /*
   ** Default loader color
   */
  loaderPrimary: darkPalette.primary600,
  /*
   ** Default loader color
   */
  loaderSecondary: darkPalette.secondary500,
  /**
   * The default border color.
   */
  border: darkPalette.secondary000,
  /**
   * The main tinting color.
   */
  tint: darkPalette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: darkPalette.neutral400,
  /**
   * The default color of the notification.
   */
  notification: defaultPalette.accent400,
  /**
   * Error messages.
   */
  error: darkPalette.angry500,
  /**
   * Error Background.
   */
  errorBackground: darkPalette.angry100,
};
/*
 ** Returning theme based on user theme selection
 */
function getTheme() {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === 'dark' ? DARK_COLORS : DEFAULT_COLORS;
}

export const COLORS = getTheme();

export type Colors = typeof COLORS;
/*
 ** Custome theme for adding new colors into it
 */
export type CustomTheme = Theme & {
  colors: Colors;
};

export interface IStyle {
  position: any;
  left: any;
  right: any;
  top: any;
  bottom: any;
  margin: any;
  mL: any;
  mR: any;
  mT: any;
  mB: any;
  mH: any;
  mV: any;
  padding: any;
  pB: any;
  pT: any;
  pL: any;
  pR: any;
  pH: any;
  pV: any;
  height: any;
  width: any;
  color: any;
  bgColor: any;
  flex: any;
  textTransform: any;
  textAlign: any;
  alignSelf: any;
  fontSize: any;
  fontStyle: any;
  maxHeight: any;
  borderWidth: any;
  flexGrow: any;
  fontFamily: any;
  widthHeight: any;
  flexWrap: any;
  bR: any;
  borderBottomRightRadius: any;
  borderBottomLeftRadius: any;
  borderTopRightRadius: any;
  borderTopLeftRadius: any;
  minHeight: any;

  fullWidth: any;
  JCStart: any;
  JCEnd: any;
  JCCenter: any;
  JCAround: any;
  JCBt: any;
  JCEvenly: any;
  AIStart: any;
  AIEnd: any;
  AICenter: any;
  selfRight: any;
  selfLeft: any;
  selfCenter: any;
  row: any;
  middle: any;
  spbw: any;
  rowCenter: any;
  rowCenterBt: any;
  centerCenter: any;
  hitSlop: any;
  shadow: any;
  modalShadow: any;
  flex1: any;
  jcStart: any;
  width100: any;
  textDecorationLine: any;
  borderColor: any;
  lineHeight: any;
  opacity: any;
  zIndex: any;
  display: any;
}


export const STYLES = StyleSheet.create<IStyle>({
  AICenter: {alignItems: 'center'},
  AIEnd: {alignItems: 'flex-end'},
  AIStart: {alignItems: 'flex-start'},
  JCAround: {justifyContent: 'space-around'},
  JCBt: {justifyContent: 'space-between'},
  JCCenter: {justifyContent: 'center'},
  JCEnd: {justifyContent: 'flex-end'},
  JCEvenly: {justifyContent: 'space-evenly'},
  JCStart: {justifyContent: 'flex-start'},
  alignSelf: (alignSelf: FlexAlignType) => ({alignSelf}),
  bR: (bR: number) => ({borderRadius: bR}),
  bgColor: (backgroundColor: string) => ({backgroundColor}),
  borderBottomLeftRadius: (borderBottomLeftRadius: number) => ({
    borderBottomLeftRadius,
  }),
  borderBottomRightRadius: (borderBottomRightRadius: number) => ({
    borderBottomRightRadius,
  }),
  borderTopLeftRadius: (borderTopLeftRadius: number) => ({
    borderTopLeftRadius,
  }),
  borderTopRightRadius: (borderTopRightRadius: number) => ({
    borderTopRightRadius,
  }),
  borderColor: (borderColor: string) => ({borderColor}),
  borderWidth: (borderWidth: number) => ({borderWidth}),
  bottom: (bottom: number) => ({bottom}),
  centerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: (color: string) => ({color}),
  flex: (flex: number) => ({flex}),
  flex1: {flex: 1},
  flexGrow: (flexGrow: number) => ({flexGrow}),
  flexWrap: (wrap: string) => ({flexWrap: wrap}),
  fontFamily: (family: string) => ({fontFamily: family}),
  fontSize: (fontSize: number) => ({fontSize}),
  fontStyle: (style: string) => ({fontStyle: style}),
  fullWidth: {width: '100%'},
  height: (height: string | number = '0%') => ({height}),
  hitSlop: {
    bottom: 15,
    left: 15,
    right: 15,
    top: 15,
  },
  jcStart: {justifyContent: 'flex-start'},
  left: (left: number) => ({left}),

  lineHeight: (lineHeight: number) => ({lineHeight}),
  mB: (marginBottom: number) => ({marginBottom}),
  mH: (marginHorizontal: number) => ({marginHorizontal}),
  mL: (marginLeft: number) => ({marginLeft}),
  mR: (marginRight: number) => ({marginRight}),
  mT: (marginTop: number) => ({marginTop}),
  mV: (marginVertical: number) => ({marginVertical}),
  margin: (margin: number) => ({margin}),
  maxHeight: (maxHeight: number) => ({maxHeight}),
  middle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  minHeight: (minHeight: number) => ({minHeight}),
  modalShadow: {
    elevation: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,

    shadowRadius: 11.95,
  },

  opacity: (opacity: number) => ({opacity}),
  pB: (paddingBottom: number) => ({paddingBottom}),
  pH: (paddingHorizontal: number) => ({paddingHorizontal}),
  pL: (paddingLeft: number) => ({paddingLeft}),
  pR: (paddingRight: number) => ({paddingRight}),
  pT: (paddingTop: number) => ({paddingTop}),
  pV: (paddingVertical: number) => ({paddingVertical}),
  padding: (padding: number) => ({padding}),
  position: (position: number) => ({position}),
  right: (right: number) => ({right}),
  row: {flexDirection: 'row'},
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowCenterBt: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  selfCenter: {alignSelf: 'center'},
  selfLeft: {alignSelf: 'flex-start'},

  selfRight: {alignSelf: 'flex-end'},

  shadow: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  spbw: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textAlign: (align: string) => ({textAlign: align}),

  textDecorationLine: (textDecorationLine: string) => ({
    textDecorationLine,
  }),

  textTransform: (textTransform: string) => ({
    textTransform,
  }),

  top: (top: number) => ({top}),
  display: (display: string) => ({display}),

  width: (width: string | number = '0%') => ({width}),
  width100: {
    width: '100%',
  },

  widthHeight: (width = 0, height = 0) => ({width, height}),
  zIndex: (zIndex: number) => ({zIndex}),
});
