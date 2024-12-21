import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppButton, AppScreen, AppText, AuthHeader, BackButton, InputTextLabel } from '../../components';
import Toast from 'react-native-simple-toast';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { ZodError } from 'zod';
import { loginSchema } from '../../utils/SchemaValidation';
import styles from './style';
import { useAppStore } from '../../store';
import { signIn } from '../../store/authSlice/authApiService';
import { useTheme } from '@react-navigation/native';
import { CustomTheme, STYLES } from '../../theme';
import { SVG } from '../../assets';
import { normalizeFont, normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY } from '../../theme/size';

export default function LoginScreen(): JSX.Element {
  const { colors } = useTheme() as CustomTheme;

  /*
   ** States
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const userData = useAppStore(state => state.userData);

  console.log('🚀 ~ LoginScreen ~ userData:', userData);
  /*
   * Hooks
   */
  const navigation = useAppNavigation();
  /*
   * Functions
   */
  /*
   *  Btn press to make user Login
   */
  const appBtnPress = async () => {
    try {
      const params = {
        email: emailAddress?.trim(),
        password,
      };
      loginSchema.parse(params);
      setLoading(true);
      // singing user in app
      await signIn(params);
      setLoading(false);
      console.log('params:', params);
    } catch (error: unknown | ZodError) {
      setLoading(false);
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ appBtnPress ~ error:', error);
    }
  };
  return (
    <AppScreen backgroundColor={colors.background}>
      <BackButton />

      <AuthHeader text1={'loginHeading'} text2={'loginSubHeading'} />

      <InputTextLabel  textLable={'email'} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <AppText transText={'forgotPasswordsmall'} textColor={colors.Ebony} style={{fontWeight: '400', fontSize: normalizeFont(14), textDecorationLine: 'underline'}} />
      </TouchableOpacity>

      <AppButton title={'login'} onPress={appBtnPress} btnStyle={{ backgroundColor: colors.primary1 }} textStyle={{ color: colors.inputColor }} loading={loading} />


      <View style={[STYLES.rowCenter, STYLES.JCCenter, STYLES.mV(30)]}>
        <AppText transText={`Don't have an account?`} style={{ color: colors.Ebony, marginRight: 5, fontSize: normalizeFont(16), fontWeight: '400' }} />
        <AppText transText={'Sign up'} onPress={() => navigation.navigate('SignupScreen')} style={{ color: colors.SeaBuckthorn, fontSize: normalizeFont(16), fontWeight: '700',textDecorationLine: 'underline' }} />

      </View>



      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: pixelSizeX(20), justifyContent: 'space-between', marginBottom: pixelSizeY(30) }}>
        <View style={{ width: '45%', height: 2, backgroundColor: colors.secondary }} />
        <AppText transText={'OR'} style={STYLES.color(colors.Nevada)} presetStyle={'default'} />
        <View style={{ width: '45%', height: 2, backgroundColor: colors.secondary }} />


      </View>


      <AppButton title={'Coninue with Google'} RightChild={<SVG.GoogleIcon width={normalizeWidth(25)} height={normalizeHeight(25)} />} btnStyle={{ backgroundColor: colors.secondary }} textStyle={{ color: colors.primary1 }} loading={loading} />
      <AppButton title={'Coninue with Apple'} RightChild={<SVG.AppleIcon width={normalizeWidth(25)} height={normalizeHeight(25)} />} btnStyle={{ backgroundColor: colors.secondary, marginTop: 10 }} textStyle={{ color: colors.primary1 }} loading={loading} />
    </AppScreen>
  );
}
