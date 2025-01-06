import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, CustomTheme, STYLES } from '../../theme'
import AppText from './AppText'
import { normalizeFont, pixelSizeX, pixelSizeY } from '../../theme/size';
import { SVG } from '../../assets';
import { useTheme } from '@react-navigation/native';
import AppButton from './AppButton';
import SmallButton from './SmallButton';

interface IAppCard {
    type?: string;
    leftText?: string;
    leftIcon?: React.ReactNode
    title?: string
    desc?: string
}


const AppCard: React.FC<IAppCard> = ({ type = 'Purchased', leftText = 'View Statistics', leftIcon = <SVG.StaticsIcon />, title = '', desc = '' }) => {
    const { colors } = useTheme() as CustomTheme
    return (
        <View style={styles.cardCont}>
            <View style={STYLES.rowCenterBt}>
                <AppText style={[STYLES.fontSize(normalizeFont(12)), STYLES.fontWeight('400'), STYLES.color(colors.Ebony)]}>{type}</AppText>

                <TouchableOpacity style={STYLES.rowCenter}>
                    <AppText style={[STYLES.fontSize(normalizeFont(14)), STYLES.fontWeight('400'), STYLES.color(colors.primary1), STYLES.mR(5)]}>{leftText}</AppText>
                    {leftIcon}
                </TouchableOpacity>
            </View>

            <AppText style={[STYLES.fontSize(normalizeFont(28)), STYLES.fontWeight('500'), STYLES.color(colors.Ebony), STYLES.mT(pixelSizeY(30))]}>{title}</AppText>

            <AppText style={[STYLES.fontSize(normalizeFont(14)), STYLES.fontWeight('400'), STYLES.color(colors.Ebony), STYLES.mT(pixelSizeY(10))]}>{desc}</AppText>

            <View style={[STYLES.rowCenterBt, STYLES.mT(pixelSizeY(30))]}>
                <SmallButton text1='Total Mastery' btnCont={[STYLES.flex1, STYLES.mR(pixelSizeX(20))]} text2='21%' />
                <SmallButton text1='Cards Studied' btnCont={STYLES.flex1} text2='81' />
            </View>
        </View>
    )
}

export default AppCard

const styles = StyleSheet.create({
    cardCont: {
        width: '100%',
        backgroundColor: COLORS.secondary,
        borderRadius: 12,
        padding: pixelSizeX(10)

    }
})