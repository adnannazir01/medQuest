import {StyleProp, TextStyle, ViewStyle} from 'react-native';

type Style = {
  container?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  iconContainer?: StyleProp<ViewStyle>;
};

export type CheckBoxProps = {
  title?: string;
  style?: Style;
  onValueChanged: () => void;
  value: boolean;
  bgColor?: string;
  iconColor?: string;
  tintColor?: string;
  svgIcon?: any | null;
  type?: 'radio' | 'checkbox';
  boxType?: 'square' | 'circle';
  titleLeft?: boolean;
};
