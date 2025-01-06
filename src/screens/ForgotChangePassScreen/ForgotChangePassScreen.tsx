import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, InputTextLabel, OTPFieldInput} from '../../components';
import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import styles from './style';
import {AuthStackParamList} from '../../routes/types.navigation';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {changePasswordSchema} from '../../utils/SchemaValidation';
import {ZodError} from 'zod';
import {CustomTheme, STYLES} from '../../theme';
import {forgotChangePassword, resendConfirmationCode} from '../../store/authSlice/authApiService';
import {normalizeFont} from '../../theme/size';
import {AppValidation} from '../../utils/Validations';
import {confirmResetPassword, ConfirmResetPasswordInput, resetPassword} from 'aws-amplify/auth';

export default function ForgotChangePassScreen(): JSX.Element {
  /*
   ** Hooks
   */
  const route = useRoute<RouteProp<AuthStackParamList, 'ForgotChangePassScreen'>>();
  const navigation = useAppNavigation();
  const {colors} = useTheme() as CustomTheme;
  const appValidation = new AppValidation();

  /*
   ** Routing params
   */
  const {email} = route.params;
  console.log('emailAddress', route.params);
  /*
   ** States
   */
  const [password, setPassword] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [countDown, setCountDown] = useState<number>(59);
  const [resendCode, setResendCode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Functions
   */
  // when reste btn is pressed
  const resetPassPressed = async () => {
    try {
      const params = {
        confirmationCode,
        email: email?.trim(),
        password,
        confirmPassword,
      };
      const data = changePasswordSchema.parse(params);
      console.log('🚀 ~ resetPassPressed ~ data:', data);
      setLoading(true);
      await forgotChangePassword(params.email, params.password, params.confirmationCode);
      setLoading(false);

      navigation.goBack();
      navigation.goBack();
    } catch (error) {
      console.log('🚀 ~ appBtnPress ~ error:', error);
      setLoading(true);
      if (error instanceof ZodError) {
        Toast.show(error?.issues[0]?.message, Toast.LONG);
      }
    }
  };

  // when resend code is pressed
  const onPressResendCode = async () => {
    setResendCode(false);
    try {
      setLoading(true);
      const resendingResetPwdCode = await resetPassword({username: email});

      console.log('RESET RESET PWD CODe', resendingResetPwdCode);

      if (resendingResetPwdCode) {
        return Toast.show(`Code resent`, Toast.LONG);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('🚀 ~ onPressResendCode ~ error:', error);
    }
  };
  /*
   ** Lifecycles
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

  // Rendering

  const onPressContinue = async () => {
    console.log('heree', password, ' confirm poas ', confirmPassword, ' code ', confirmationCode);

    setLoading(true);

    if (!checkTextFieldValidation()) {
      setLoading(false);
      return;
    }
    try {
      const params = {
        confirmationCode,
        email,
        password,
        confirmPassword,
      };
      setLoading(true);
      const data = changePasswordSchema.parse(params);
      console.log('🚀 ~ resetPassPressed ~ data:', data);

      const resetPwd = await handleConfirmResetPassword({
        username: email,
        confirmationCode: confirmationCode,
        newPassword: password,
      });
      console.log('reset pwd', resetPwd);

      setLoading(false);

      // navigation.goBack();
      // navigation.goBack();
    } catch (error) {
      console.log('🚀 ~ appBtnPress ~ error:', error);
      setLoading(false);
      if (error instanceof ZodError) {
        console.log('here', error?.issues[0]?.message);

        Toast.show(error?.issues[0]?.message, Toast.LONG);
        setLoading(false);
      }
    }
  };

  const checkTextFieldValidation = (): boolean => {
    console.log('THIS ISS ');

    if (!password || !confirmPassword) {
      console.log('THIS ISS1 ');
      Toast.show(`Input fields can't be empty`, Toast.LONG);
      return false;
    }
    if (password !== confirmPassword) {
      console.log('THIS ISS4 ');
      Toast.show(`Passwords do not match`, Toast.LONG);
      return false;
    }

    if (!appValidation.validatePassword(password)) {
      console.log('THIS ISS2 ');
      Toast.show(
        `Password should be at least 8 characters with one uppercase, one lowercase, one special numeric character`,
        Toast.LONG,
      );
      return false;
    }
    if (!appValidation.validatePassword(confirmPassword)) {
      console.log('THIS ISS3 ');
      Toast.show(
        `Password should be at least 8 characters with one uppercase, one lowercase, one special numeric character`,
        Toast.LONG,
      );
      return false;
    }

    console.log('THIS ISS5 ');
    return true;
  };

  async function handleConfirmResetPassword({username, confirmationCode, newPassword}: ConfirmResetPasswordInput) {
    try {
      await confirmResetPassword({username, confirmationCode, newPassword});
      Toast.show(`Password changed successfully`, Toast.LONG);
      navigation.navigate('LoginScreen');
    } catch (error) {
      Toast.show(error.message, Toast.LONG);
      console.log('error here', error);
      console.log('error msg here', error.message);
    }
  }
  return (
    <AppScreen>
      <BackButton />

      <AuthHeader text1={'forgotPasswordBold'} text2={'forgotChangePasswordLable'} viewStyle={styles.mainView} />

      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      <InputTextLabel
        textLable={'reEnterPassword'}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        isPassword={true}
      />

      <OTPFieldInput textLable={'confirmationCode'} onChangeText={setConfirmationCode} />

      {/* <AppButton title={'resetPassword'} onPress={resetPassPressed} loading={loading} /> */}
      <AppButton
        title={'resetPassword'}
        onPress={onPressContinue}
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
          <AppText
            presetStyle={'formLabel'}
            onPress={onPressResendCode}
            textColor={colors.textDim}>{`Wait for 00:${countDown}`}</AppText>
        )}
      </View>
    </AppScreen>
  );
}
