import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import { useDogs } from '../../store/userSlice/userApiServices';
import { AppHeader, AppScreen, AppText, AuthHeader, InputTextLabel } from '../../components';
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, CustomTheme, STYLES } from '../../theme';
import { normalizeFont, normalizeHeight, pixelSizeX, pixelSizeY } from '../../theme/size';
import { SVG } from '../../assets';

const dataa = [
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  }, {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
  {
    title: 'Pharmacology',
    icon: <SVG.pharmaIcon stroke={COLORS.primary1} />
  },
]

const HomeScreen = () => {
  const { colors } = useTheme() as CustomTheme
  const navigation = useNavigation()
  const { data, isPending, error } = useDogs();
  const [search, setSearch] = useState<string>('')
  console.log('🚀 ~ HomeScreen ~ data:', data);
  console.log('🚀 ~ HomeScreen ~ error:', error);
  console.log('🚀 ~ HomeScreen ~ isPending:', isPending);
  /*
   ** Lifecycle methods
   */
  if (isPending) return <Text>'Loading...'</Text>;

  if (error) return <Text>An error has occurred: ' + error.message</Text>;

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CustomizeStudyScreen')} style={styles.btnCont}>
        {item.icon}
        <AppText transText={item.title} style={{ color: colors.primary1, fontSize: normalizeFont(16), fontWeight: '500', marginTop: pixelSizeY(5) }} />

      </TouchableOpacity>
    )
  }

  return (
    <View style={[STYLES.pH(pixelSizeX(20)), STYLES.flex1, STYLES.bgColor(colors.background)]}>
      <AppHeader title='Conrad Fischer' type='home' />

      <AuthHeader viewStyle={[STYLES.mL(0), STYLES.mB(-10)]} lowerTextStyle={STYLES.fontSize(normalizeFont(13))} upperTextStyle={[STYLES.fontSize(normalizeFont(32)), STYLES.lineHeight(40)]} text1={'homeHeading'} text2={'homeSubHeading'} />

      <InputTextLabel textInputStyle={STYLES.pL(pixelSizeX(10))} viewStyle={{ width: '100%' }} rightIcon placeHolder='Search' leftIcon onChangeText={setSearch} value={search} >
        <SVG.SearchIcon />
        <SVG.FilterIcon />
      </InputTextLabel>

      <AppText transText={'homeTitle'} style={{ color: colors.Ebony, fontSize: normalizeFont(18), fontWeight: '500', marginVertical: pixelSizeY(20) }} />

      <FlatList data={dataa} style={{}} columnWrapperStyle={STYLES.JCBt} renderItem={renderCard} numColumns={2} />
    </View>

  );
};

export default HomeScreen;
