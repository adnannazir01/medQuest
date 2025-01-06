import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-simple-toast';
import {SVG} from '../../assets';
import {AppButton, AppScreen, AppText, AuthHeader, BackButton, InputTextLabel} from '../../components';
import {useAppNavigation} from '../../hooks/useAppNavigation';
import {useAppStore} from '../../store';
// import {signIn} from '../../store/authSlice/authApiService';
import {CustomTheme, STYLES} from '../../theme';
import {normalizeFont, normalizeHeight, normalizeWidth, pixelSizeX, pixelSizeY} from '../../theme/size';
import styles from './style';

import {fetchUserAttributes, getCurrentUser, signIn, SignInInput, signOut} from 'aws-amplify/auth';
import {AppValidation} from '../../utils/Validations';
import {useQuery} from '@tanstack/react-query';
import {getUserData} from '../../services/userServices';
import {queryKey} from '../../config/QueryKeys';
import {useCreateUser} from '../../mutations/userMutation';
import {Hub} from '@aws-amplify/core';

const appValidation = new AppValidation();

export default function LoginScreen(): JSX.Element {
  const {colors} = useTheme() as CustomTheme;

  /*
   ** States
   */
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userID, setUserID] = useState('');
  const {mutate: createUser, isPending} = useCreateUser();

  /*
   * Hooks
   */
  const navigation = useAppNavigation();
  const {data, isFetched} = useQuery({
    queryKey: [queryKey.GET_USER],
    queryFn: () => getUserData(userID),
    enabled: !!userID,
  });
  /*
   * Functions
   */

  useEffect(() => {
    if (isFetched && data?.data === null) {
      console.debug('🚀 ~ file: LoginScreen.tsx:106 ~ useEffect ~ isFetched && data.data:', isFetched, data.data);
      // if (isSocialLogin) {
      createSocialUser();
      // }
    }

    return () => {
      setUserID('');
    };
  }, [isFetched, data]);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({payload}) => {
      switch (payload.event) {
        case 'signInWithRedirect':
          getUser();
          break;
        case 'signInWithRedirect_failure':
          console.log('An error has occurred during the OAuth flow.', payload);
          if (payload.data.error?.message === 'PreSignUp failed with error User already exists.. ') {
            Toast.show(`User already exists`, Toast.LONG);
          }
          break;
        case 'customOAuthState':
          console.log(payload.data);
          break;
      }
    });

    // getUser();

    return unsubscribe;
  }, []);

  const getUser = async (): Promise<void> => {
    try {
      const {sub} = await fetchUserAttributes();
      if (sub) {
        setUserID(sub);
      }
    } catch (error) {
      console.error(error);
      console.log('Not signed in');
    }
  };

  const createSocialUser = async () => {
    try {
      const {sub, email} = await fetchUserAttributes();

      if (!sub || !email) {
        return;
      }

      createUser(
        {email, cognitoId: sub},
        {
          onSuccess: (res: any) => {
            console.debug('🚀 ~ file: OTPScreen.tsx:78 ~ handleSignUpConfirmation ~ res:', res);
            useAppStore.getState().updateUserData(res?.data);
            setLoading(false);
          },
          onError: error => {
            setLoading(false);
            signOut();
            console.log('error creating user', error);
          },
        },
      );
    } catch (error) {}
  };
  /*
   *  Btn press to make user Login
   */

  const checkTextFieldValidation = () => {
    if (!emailAddress || !password) {
      Toast.show(`Input fields can't be empty`, Toast.LONG);
      return false;
    }
    if (!appValidation.validateLogin(emailAddress.trim())) {
      Toast.show(`Email is not valid`, Toast.LONG);
      return false;
    }
    return true;
  };
  const onPressLogin = async (): void => {
    setLoading(true);

    if (!checkTextFieldValidation()) {
      setLoading(false);
      return;
    }

    console.log('Validation ok');

    handleSignIn({username: emailAddress.trim(), password});
  };

  async function handleSignIn({username = emailAddress, password}: SignInInput) {
    console.log('username', username);
    console.log('password', password);

    try {
      console.log('check3');
      const {isSignedIn, nextStep} = await signIn({username, password});
      console.log('is signed in: ', isSignedIn);
      console.log('next step: ', nextStep);

      if (isSignedIn) {
        console.log('check4');
        setLoading(false);

        try {
          console.log('check5');
          const {username, userId, signInDetails} = await getCurrentUser();
          console.log(`The username: ${username}`);
          console.log(`The userId: ${userId}`);
          console.log(`The signInDetails: ${signInDetails}`);

          if (userId) {
            console.log('check5 b', userId);

            const {username, userId, signInDetails} = await getCurrentUser();

            useAppStore.setState({
              userData: {
                userId: userId,
                username: username,
                signInDetails,
              },
            });
            setUserID(userId);
          }
        } catch (err) {
          console.log('check6');
          console.log(err);
        }

        // navigation.navigate('HomeScreen');
      } else {
        console.log('check7', nextStep);

        if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
          setLoading(false);
          // setAutoNavUser(true);
          // navigateToConfirmUser();

          // tell user to confirm signup
        } else {
          Toast.show(`${t('MESSAGES.somethingWrong')}`, Toast.LONG);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log('check8');
      console.log('error signing in', error);
      console.log('error signing in', error.message);
      setLoading(false);

      // A network error has occurred.

      if (error?.message === 'Incorrect username or password.') {
        return Toast.show(`Incorrect username or password`, Toast.LONG);
      } else if (error?.message === 'User does not exist.') {
        return Toast.show(`User does not exist`, Toast.LONG);
      } else if (error?.message === 'Attempt limit exceeded, please try after some time.') {
        return Toast.show(`Attempt limit exceeded, please try after some time`, Toast.LONG);
      } else if (error?.message === 'A network error has occurred.') {
        return Toast.show(`A network error has occurred`, Toast.LONG);
      } else if (error?.message === 'There is already a signed in user.') {
        await signOut().then(() => {
          onPressLogin();
        });
        // return Toast.show(`${t('MESSAGES.anIssueOccured')}`, Toast.LONG);
      } else {
        return Toast.show(`Something went wrong`, Toast.LONG);
      }
    }
  }
  return (
    <AppScreen backgroundColor={colors.background}>
      <BackButton />

      <AuthHeader text1={'loginHeading'} text2={'loginSubHeading'} />

      <InputTextLabel textLable={'email'} onChangeText={setEmailAddress} value={emailAddress} />
      <InputTextLabel textLable={'password'} onChangeText={setPassword} value={password} isPassword={true} />

      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <AppText
          transText={'forgotPasswordsmall'}
          textColor={colors.Ebony}
          style={{fontWeight: '400', fontSize: normalizeFont(14), textDecorationLine: 'underline'}}
        />
      </TouchableOpacity>

      <AppButton
        title={'login'}
        onPress={onPressLogin}
        btnStyle={{backgroundColor: colors.primary1}}
        textStyle={{color: colors.inputColor}}
        loading={loading}
      />

      <View style={[STYLES.rowCenter, STYLES.JCCenter, STYLES.mV(30)]}>
        <AppText
          transText={`Don't have an account?`}
          style={{color: colors.Ebony, marginRight: 5, fontSize: normalizeFont(16), fontWeight: '400'}}
        />
        <AppText
          transText={'Sign up'}
          onPress={() => navigation.navigate('SignupScreen')}
          style={{
            color: colors.SeaBuckthorn,
            fontSize: normalizeFont(16),
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: pixelSizeX(20),
          justifyContent: 'space-between',
          marginBottom: pixelSizeY(30),
        }}>
        <View style={{width: '45%', height: 2, backgroundColor: colors.secondary}} />
        <AppText transText={'OR'} style={STYLES.color(colors.Nevada)} presetStyle={'default'} />
        <View style={{width: '45%', height: 2, backgroundColor: colors.secondary}} />
      </View>

      <AppButton
        title={'Coninue with Google'}
        RightChild={<SVG.GoogleIcon width={normalizeWidth(25)} height={normalizeHeight(25)} />}
        btnStyle={{backgroundColor: colors.secondary}}
        textStyle={{color: colors.primary1}}
        loading={loading}
      />
      <AppButton
        title={'Coninue with Apple'}
        RightChild={<SVG.AppleIcon width={normalizeWidth(25)} height={normalizeHeight(25)} />}
        btnStyle={{backgroundColor: colors.secondary, marginTop: 10}}
        textStyle={{color: colors.primary1}}
        loading={loading}
      />
    </AppScreen>
  );
}
