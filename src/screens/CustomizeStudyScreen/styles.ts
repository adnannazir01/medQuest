import { StyleSheet } from "react-native";
import { normalizeHeight, pixelSizeX, pixelSizeY } from "../../theme/size";
import { COLORS, HEIGHT, WIDTH } from "../../theme";

export const styles = StyleSheet.create({
    tabBtn:{
        height: normalizeHeight(34), 
        backgroundColor: COLORS.secondary, 
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },

    categoryCardCont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: normalizeHeight(50),
        backgroundColor: COLORS.white,
        width: '100%',
        marginBottom: pixelSizeY(10),
        borderRadius: 8,
        elevation: 0.4,
        paddingHorizontal: pixelSizeX(10),
        alignItems:'center'
    },

    centeredView: {
        alignItems: 'center',
        backgroundColor: COLORS.transparent,
        flex: 1,
        // justifyContent: 'flex-end',
        position: 'absolute',
        bottom:0
      },
      modalView: {
        backgroundColor: COLORS.white,
        width: WIDTH,
        minHeight: HEIGHT * 0.5,
        maxHeight: HEIGHT * 0.8,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderWidth:1,
        borderColor: COLORS.greyShade,
        padding: pixelSizeX(20)
      },
}) 