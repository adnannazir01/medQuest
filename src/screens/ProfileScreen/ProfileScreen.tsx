import {Text, View} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {AppButton} from '../../components';
import {useAppStore} from '../../store';
import {signOut} from 'aws-amplify/auth';

const ProfileScreen = () => {
  /*
   ** Hooks
   */
  const userData = useAppStore(state => state.userData);
  const userTokens = useAppStore(state => state.tokens);
  /*
   ** States
   */
  const [loading, setLoading] = useState<boolean>(false);
  /*
   ** Functions
   */
  const userSignOut = async () => {
    try {
      setLoading(true);
      await signOut();

      // Clear the user data in your store so RootNavigator loads AuthStack
      useAppStore.setState({userData: null});

      setLoading(false);
    } catch (error) {
      console.log('🚀 ~ signOut ~ error:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainView}>
      <Text>ProfileScreen</Text>
      <AppButton title={'logout'} onPress={() => userSignOut()} loading={loading} />
    </View>
  );
};

export default ProfileScreen;
