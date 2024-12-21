import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { ZodError } from 'zod';
import {
  AppButton,
  AppScreen,
  AppText,
  AuthHeader,
  BackButton,
  InputTextLabel
} from '../../components';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import useImagePicker from '../../hooks/useImagePicker';
import { CustomTheme, STYLES } from '../../theme';
import { signupSchema } from '../../utils/SchemaValidation';
import { imageObjectType } from './types';
import { normalizeFont, pixelSizeY } from '../../theme/size';

export default function SignupScreen() {
  const { colors } = useTheme() as CustomTheme;

  /*
   ** State
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [imageAsset, setImageAsset] = useState<imageObjectType | null>(null);
  /*
   * custom hooks
   */
  const { onPressImageUpload } = useImagePicker();
  /*
   * Hooks
   */
  const navigation = useAppNavigation();
  /*
   ** Functions
   */

  /*
   **   When continue button is pressed
   */
  const ContinuePressed = (): void => {
    try {
      const params = {
        firstName: fullName?.trim(),
        lastName: lastName?.trim(),
        email: emailAddress?.trim()?.toLowerCase(),
        password: password?.trim(),
        dateOfBirth: dateOfBirth?.toISOString(),
      };
      const data = signupSchema.parse(params);
      console.log('🚀 ~ ContinuePressed ~ data:', data);
      navigation.navigate('ContactScreen', params);
    } catch (error) {
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
      console.log('🚀 ~ ContinuePressed ~ error:', error);
    }
  };
  /*
   * open camear or gallery for image upload
   */
  const onPressMedia = (): void => {
    setLoading(true);
    // calling hook function
    onPressImageUpload({
      callBck: result => {
        console.log('result in main file is', result);
        if (result.assets && result.assets[0]) {
          const imageData = result.assets[0] as unknown as imageObjectType;
          setImageAsset(imageData);
        }
        setLoading(false);
      },
    });
  };
  // Rendering
  return (
    <AppScreen preset='scroll' backgroundColor={colors.background}>
      <BackButton />

      <AuthHeader text1={'signupHeading'} text2={'signupSubHeading'} />

      <InputTextLabel textLable={'Full Name'} onChangeText={setFullName} value={emailAddress} />
      <InputTextLabel textLable={'email'} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />
      <InputTextLabel textLable={'Confirm Password'} onChangeText={setConfirmPassword} value={password} isPassword={true} />

      <AppButton title={'Register Now'} onPress={() => navigation.navigate('ConfirmSignupScreen',{email: '', password: ''})} btnStyle={{ backgroundColor: colors.primary1 }} textStyle={{ color: colors.inputColor }} loading={loading} />

      <View style={[STYLES.rowCenter, STYLES.JCCenter, STYLES.mT(pixelSizeY(40))]}>
        <AppText transText={'Already have an account?'} style={{ color: colors.Ebony, marginRight: 5, fontSize: normalizeFont(16), fontWeight: '400' }} />
        <AppText transText={'Login In'} onPress={() => navigation.navigate('LoginScreen')} style={{ color: colors.SeaBuckthorn, fontSize: normalizeFont(16), fontWeight: '700', textDecorationLine: 'underline' }} />

      </View>
    </AppScreen>
  );
}
