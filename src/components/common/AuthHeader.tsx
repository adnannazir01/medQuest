import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {TxKeyPath} from '../../i18n/types';
import AppText from './AppText';
import {useTheme} from '@react-navigation/native';
import {COLORS, CustomTheme} from '../../theme';
import { normalizeFont, pixelSizeX, pixelSizeY } from '../../theme/size';

interface authHeaderType {
  text1: TxKeyPath;
  text2?: TxKeyPath;
  viewStyle?: StyleProp<ViewStyle>;
  upperTextStyle?: StyleProp<ViewStyle>;
  lowerTextStyle?: StyleProp<ViewStyle>;
}

export default function AuthHeader(props: authHeaderType): JSX.Element {
  /*
   ** Props
   */
  const {text1, text2, viewStyle = {}, upperTextStyle = {}, lowerTextStyle ={}} = props;
  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;

  return (
    <View style={[styles.mainView, viewStyle]}>
      <AppText presetStyle={'heading'} transText={text1} style={[ {fontSize: normalizeFont(40), lineHeight: 50, color
        : colors.Ebony
      },upperTextStyle]} />
      <AppText
        presetStyle={'headingDescription'}
        transText={text2}
        style={[styles.lowerTextStyle, lowerTextStyle]}
        textColor={colors.textDim}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lowerTextStyle: {marginTop: pixelSizeY(10), fontSize: normalizeFont(16), lineHeight: 25, color: COLORS.Nevada},
  mainView: {
    marginLeft: pixelSizeX(20),
    marginVertical: pixelSizeY(10),
  },
});
