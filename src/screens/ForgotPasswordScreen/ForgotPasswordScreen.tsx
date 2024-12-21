import React, {useState} from 'react';
import {AppButton, AppScreen, AuthHeader, BackButton, InputTextLabel} from '../../components';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {emailSchema} from '../../utils/SchemaValidation';
import {forgotPassword} from '../../store/authSlice/authApiService';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../theme';

export default function ForgotPasswordScreen(): JSX.Element {
    const { colors } = useTheme() as CustomTheme;
  
  /*
   ** States
   */
  const [emailAddress, setEmailAddres] = useState<string>('shaheer.ahmed@algoace.com');
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Hooks
   */
  const navigation = useAppNavigation();
  /*
   ** Functions
   */
  /*
   ** Navigation to another screen
   */
  const resetPassPressed = async () => {
    try {
      const params = {
        email: emailAddress,
      };
      navigation.navigate('ForgotChangePassScreen', {
        email: params.email,
      });
      emailSchema.parse(params);
      setLoading(true);
      await forgotPassword(params.email);
      setLoading(false);

      navigation.navigate('ForgotChangePassScreen', {
        email: params.email,
      });
    } catch (error: unknown | ZodError) {
      setLoading(false);
      console.log('🚀 ~ appBtnPress ~ error:', error);
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
    }
  };

  // Rendering
  return (
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotPasswordLable'} />

      <InputTextLabel textLable={'emailAddress'} onChangeText={setEmailAddres} value={emailAddress} />

       <AppButton title={'resetPassword'} onPress={resetPassPressed} btnStyle={{ backgroundColor: colors.primary1 }} textStyle={{ color: colors.inputColor }} loading={loading} />
    </AppScreen>
  );
}
