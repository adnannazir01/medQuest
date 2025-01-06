import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, OTPFieldInput} from '../../components';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {AuthStackParamList} from '../../routes/types.navigation';
import {styles} from './style';
import {ZodError} from 'zod';
import {confirmationCodeValidation} from '../../utils/SchemaValidation';
import {CustomTheme, STYLES} from '../../theme';
import {confirmSignup, resendConfirmationCode} from '../../store/authSlice/authApiService';
import {normalizeFont} from '../../theme/size';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {confirmSignUp, ConfirmSignUpInput, getCurrentUser, resendSignUpCode, signIn} from 'aws-amplify/auth';

export default function ConfirmSignupScreen(): JSX.Element {
  /*
   ** Hooks
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ConfirmSignupScreen'>>();
  /*
   ** Routing params
   */
  const {email, resetPassword = false, password} = route.params;
  /*
   ** States
   */
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [countDown, setCountDown] = useState<number>(59);
  const [resendCode, setResendCode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;
  const navigation = useAppNavigation();
  /*
   ** Functions
   */

  /*
   ** when submit code is pressed
   */
  const submitCodePressed = () => {
    console.log('Code ', confirmationCode, 'email ', email, 'password ', password);

    if (!confirmationCode) {
      Toast.show(`Code required`, Toast.LONG);
      return;
    }
    console.log('here4');
    if (resetPassword) {
      console.log('HERE');

      navigation.navigate('ForgotChangePassScreen', {
        email,
        confirmationCode,
      });
    } else {
      console.log('all good');

      handleSignUpConfirmation({username: email, confirmationCode: confirmationCode});
    }
    console.log('end');
  };

  async function handleSignUpConfirmation({username, confirmationCode}: ConfirmSignUpInput) {
    setLoading(true);
    try {
      const {isSignUpComplete} = await confirmSignUp({
        username,
        confirmationCode,
      });

      const {isSignedIn} = await signIn({username, password});

      console.log('isSignedIn', isSignedIn, isSignUpComplete);

      if (isSignUpComplete && isSignedIn) {
        navigation.navigate('LoginScreen');

        // createUser(
        //   {email: username, cognitoId: userId},
        //   {
        //     onSuccess: res => {
        //       console.debug('🚀 ~ file: OTPScreen.tsx:78 ~ handleSignUpConfirmation ~ res:', res);
        //       setUserID(userId);
        //       setLoading(false);
        //     },
        //     onError: error => {
        //       setLoading(false);
        //       console.log('error creating user', error);
        //     },
        //   },
        // );
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error confirming sign up', error);
      console.log('error confirming sign up', error.name);
      if (error.name === 'CodeMismatchException') {
        return Toast.show(`Incorrect OTP provided`, Toast.LONG);
      } else if (error?.message === 'A network error has occurred.') {
        return Toast.show(`No internet connection`, Toast.LONG);
      }
    }
  }
  /*
   ** When resend code is pressed
   */
  const onPressResendCode = async () => {
    setResendCode(false);
    try {
      setLoading(true);
      const resendingCode = await resendSignUpCode({
        username: email,

        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });

      console.log('resending code', resendCode);
      console.log('check 1');

      if (resendingCode) {
        return Toast.show(`Code resent`, Toast.LONG);
      }
      // if (userId) {
      //   console.log('check 2');
      //   setLoading(false);
      //   // navigation.navigate('OTPScreen', params);
      // }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return Toast.show(`An error occured`, error.message);
    }
  };
  /*
   **   Lifecycle methods
   */
  useEffect(() => {
    // if rensend code is false then only count start
    let interval: NodeJS.Timeout;
    if (resendCode === false) {
      interval = setInterval(() => {
        if (countDown < 1) {
          setResendCode(true);
          setCountDown(59);
          clearInterval(interval);
        } else {
          setCountDown(prevValue => prevValue - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendCode, countDown]);

  return (
    <AppScreen>
      <BackButton />
      <AuthHeader text1={'verificationTitle'} text2={'verificationSentCode'} />
      <OTPFieldInput textLable={'confirmationCode'} onChangeText={setConfirmationCode} />
      <AppButton
        title={'submit'}
        onPress={submitCodePressed}
        btnStyle={{backgroundColor: colors.primary1}}
        textStyle={{color: colors.inputColor}}
        loading={loading}
      />
      <View style={styles.resendCodeViewstyle}>
        {resendCode ? (
          // <AppText presetStyle={'formLabel'} onPress={onPressResendCode} transText={'didRecvCode'} />
          <View style={[STYLES.rowCenter, STYLES.JCCenter]}>
            <AppText
              transText={'Didn’t received password?'}
              style={{color: colors.Ebony, marginRight: 5, fontSize: normalizeFont(16), fontWeight: '400'}}
            />
            <AppText
              transText={'Resend Code'}
              onPress={onPressResendCode}
              style={{
                color: colors.SeaBuckthorn,
                fontSize: normalizeFont(16),
                fontWeight: '700',
                textDecorationLine: 'underline',
              }}
            />
          </View>
        ) : (
          <AppText presetStyle={'formLabel'} textColor={colors.textDim}>{`Wait for 00:${countDown}`}</AppText>
        )}
      </View>
    </AppScreen>
  );
}
