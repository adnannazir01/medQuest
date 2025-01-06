import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {ZodError} from 'zod';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, InputTextLabel} from '../../components';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import useImagePicker from '../../hooks/useImagePicker';
import {CustomTheme, STYLES} from '../../theme';
import {signupSchema} from '../../utils/SchemaValidation';
import {imageObjectType} from './types';
import {normalizeFont, pixelSizeY} from '../../theme/size';
import {signUp} from 'aws-amplify/auth';

import {AppValidation} from '../../utils/Validations';

const appValidation = new AppValidation();

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

export default function SignupScreen() {
  const {colors} = useTheme() as CustomTheme;

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
  const {onPressImageUpload} = useImagePicker();
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

  const checkTextFieldValidation = (): boolean => {
    console.log('pass ', password, 'confirm ', confirmPassword);

    if (!emailAddress || !password || !confirmPassword) {
      Toast.show(`Input fields can't be empty`, Toast.LONG);
      return false;
    }
    // if (userName?.trim()?.length > 40) {
    //   Toast.show(`${t('MESSAGES.userNameLenght')}`, Toast.LONG);
    //   return false;
    // }
    // validate login
    if (!appValidation.validateLogin(emailAddress.trim())) {
      Toast.show(`You have entered an invalid email`, Toast.LONG);
      return false;
    }
    // validate first name
    // if (!appValidation.validateUserName(userName)) {
    //   Toast.show(`${t('MESSAGES.invalidUsername')}`, Toast.LONG);
    //   return false;
    // }
    // validate password
    if (password !== confirmPassword) {
      Toast.show(`Password do not match`, Toast.LONG);
      return false;
    }
    if (!appValidation.validatePassword(password)) {
      Toast.show(
        `Password should be at least 8 characters with one uppercase, one lowercase, one special numeric character`,
        Toast.LONG,
      );
      return false;
    }

    return true;
  };

  const registerPressed = async ({
    username = emailAddress?.trim()?.toLowerCase(),
    password = confirmPassword,
    email = emailAddress?.trim()?.toLowerCase(),
  }: SignUpParameters) => {
    console.log('Params', {username, password, email});

    setLoading(true);
    if (!checkTextFieldValidation()) {
      setLoading(false);
      return;
    }

    try {
      const {isSignUpComplete, userId, nextStep} = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });

      if (userId) {
        console.log('All good, proceeding to the next screen');
        setLoading(false);
        navigation.navigate('ConfirmSignupScreen', {email, password});
      }
    } catch (error) {
      console.log('error signing  is:', error);
      console.log('error signing up Message is:', error.message);
      console.log('error signing up Code is:', error.code);

      setLoading(false);
      if (error?.message === 'User already exists') {
        // setAutoNavUser(true);
        // tell user to login, becasue the account already exists
        return Toast.show(`User already exists`, Toast.LONG);
      } else if (error?.message === 'A network error has occurred.') {
        return Toast.show(`No internet connection`, Toast.LONG);
      } else if (error?.message === 'PreSignUp failed with error User already exists.') {
        return Toast.show(`User already exists`, Toast.LONG);
      } else if (error?.message === 'Password not long enough') {
        return Toast.show(`Password must be at least 8 characters`, Toast.LONG);
      } else {
        return Toast.show(`Something went wrong`, Toast.LONG);
      }
    }
  };
  return (
    <AppScreen preset='scroll' backgroundColor={colors.background}>
      <BackButton />

      <AuthHeader text1={'signupHeading'} text2={'signupSubHeading'} />

      <InputTextLabel textLable={'Full Name'} onChangeText={setFullName} value={fullName} />
      <InputTextLabel textLable={'email'} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />
      <InputTextLabel
        textLable={'Confirm Password'}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        isPassword={true}
      />

      <AppButton
        title={'Register Now'}
        // onPress={() => navigation.navigate('ConfirmSignupScreen', {email: '', password: ''})}
        onPress={registerPressed}
        btnStyle={{backgroundColor: colors.primary1}}
        textStyle={{color: colors.inputColor}}
        loading={loading}
      />

      <View style={[STYLES.rowCenter, STYLES.JCCenter, STYLES.mT(pixelSizeY(40))]}>
        <AppText
          transText={'Already have an account?'}
          style={{color: colors.Ebony, marginRight: 5, fontSize: normalizeFont(16), fontWeight: '400'}}
        />
        <AppText
          transText={'Login In'}
          onPress={() => navigation.navigate('LoginScreen')}
          style={{
            color: colors.SeaBuckthorn,
            fontSize: normalizeFont(16),
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}
        />
      </View>
    </AppScreen>
  );
}
