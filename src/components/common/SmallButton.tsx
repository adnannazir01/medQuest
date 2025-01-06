import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import AppText from './AppText'
import { COLORS, STYLES } from '../../theme'
import { normalizeFont, normalizeHeight, pixelSizeX } from '../../theme/size'


interface ISmallButton {
    text1?:string
    text2?:string
    text1Color?:string
    text2Color?:string
    btnCont?: any
    onPress?:() => void
}

const SmallButton: React.FC<ISmallButton> = ({text1 = '', text2 = '', text1Color = COLORS.Ebony, text2Color = COLORS.SeaBuckthorn, btnCont = {}, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.btnCont, btnCont]}>
      <View style={STYLES.rowCenter}>
        <AppText style={[STYLES.fontSize(normalizeFont(14)), STYLES.fontWeight('400'), STYLES.color(text1Color), STYLES.mR(pixelSizeX(10))]}>{text1}</AppText>
        <AppText style={[STYLES.fontSize(normalizeFont(16)), STYLES.fontWeight('500' ),STYLES.color(text2Color)]}>{text2}</AppText>
      </View>
    </TouchableOpacity>
  )
}

export default SmallButton

const styles = StyleSheet.create({
    btnCont:{
        height: normalizeHeight(35),
        width: '100%',
        backgroundColor: COLORS.inputColor,
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 4
    }
})