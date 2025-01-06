import React from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {CheckBoxProps} from './types/CheckBoxTypes';
import { SVG } from '../../assets';

const CheckBox: React.FC<CheckBoxProps> = ({
  onValueChanged = () => {},
  title = '',
  bgColor = 'black',
  tintColor = 'black',
  iconColor = 'white',
  svgIcon = null,
  style,
  value,
  boxType = 'square',
  type = 'checkbox',
  titleLeft = false,
}) => {
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({inputRange, outputRange});

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const renderIcon = () => {
    if (!value) {
      return <View />;
    }
    if (type === 'radio') {
      return <SVG.Dot fill={iconColor} />;
    }
    if (svgIcon) {
      return svgIcon;
    }
    return <SVG.Tick fill={iconColor} />;
  };

  return (
    <View style={[styles.container, style?.container]}>
      {title && titleLeft && (
        <Text
          suppressHighlighting
          onPress={onValueChanged}
          style={[styles.title, style?.title]}>
          {title}
        </Text>
      )}
      <Animated.View style={{transform: [{scale}]}}>
        <TouchableOpacity
          style={[
            styles.iconContainer(bgColor, tintColor, boxType),
            style?.iconContainer,
          ]}
          onPress={onValueChanged}
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          {renderIcon()}
        </TouchableOpacity>
      </Animated.View>
      {title && !titleLeft && (
        <Text
          suppressHighlighting
          onPress={onValueChanged}
          style={[styles.title, style?.title]}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default CheckBox;
