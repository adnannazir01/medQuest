import React, {useState} from 'react';
import {AppButton, AppScreen, AuthHeader, BackButton, InputTextLabel} from '../../components';
import Toast from 'react-native-simple-toast';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {ZodError} from 'zod';
import {emailSchema} from '../../utils/SchemaValidation';
import {forgotPassword} from '../../store/authSlice/authApiService';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from '../../theme';
import {resetPassword, ResetPasswordOutput} from 'aws-amplify/auth';

export default function ForgotPasswordScreen(): JSX.Element {
  const {colors} = useTheme() as CustomTheme;

  /*
   ** States
   */
  const [emailAddress, setEmailAddres] = useState<string>('');
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
  const onPressContinue = async () => {
    console.log('continue', emailAddress);

    setLoading(true);
    try {
      const params = {
        email: emailAddress.trim(),
      };
      emailSchema.parse(params);

      try {
        const output = await resetPassword({username: emailAddress.trim()});
        handleResetPasswordNextSteps(output);
        setLoading(false);
      } catch (error) {
        console.log('this', error);
        console.log('this message', error?.message);
        setLoading(false);
        if (error?.message === 'Attempt limit exceeded, please try after some time.') {
          return Toast.show(`Limit Exceeded`, Toast.LONG);
        } else if (error?.message === 'Username/client id combination not found.') {
          return Toast.show(`User does not exist`, Toast.LONG);
        } else if (
          error?.message ===
          'Cannot reset password for the user as there is no registered/verified email or phone_number'
        ) {
          return Toast.show(`Unverified user`, Toast.LONG);
        } else if (error?.message === 'A network error has occurred.') {
          return Toast.show(`No Network`, Toast.LONG);
        } else {
          return Toast.show(`Something went wrong`, Toast.LONG);
        }
      }
    } catch (error: unknown | ZodError) {
      console.log('🚀 ~ appBtnPress ~ error:', error);
      setLoading(false);
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
    }
  };

  function handleResetPasswordNextSteps(output: ResetPasswordOutput) {
    const {nextStep} = output;
    console.log('output forget pass', output);

    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(`Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`);
        Toast.show(`Code sent to ${codeDeliveryDetails.deliveryMedium}`, Toast.LONG);
        navigation.navigate('ForgotChangePassScreen', {email: emailAddress.trim()});
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
  }

  // Rendering
  return (
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotPasswordLable'} />

      <InputTextLabel textLable={'emailAddress'} onChangeText={setEmailAddres} value={emailAddress} />

      <AppButton
        title={'resetPassword'}
        onPress={onPressContinue}
        btnStyle={{backgroundColor: colors.primary1}}
        textStyle={{color: colors.inputColor}}
        loading={loading}
      />
    </AppScreen>
  );
}
