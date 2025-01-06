import {useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-simple-toast';
import {queryKey} from '../config/QueryKeys';
import {
  createReportType,
  createUserProfile,
  createUserReport,
  deleteUser,
  toggleBlockedUser,
  updateUserFCM,
  updateUserProfile,
  updateUserProfilePicture,
  userDataType,
} from '../services/userServices';
import {useAppStore} from '../store';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

const useCreateUser = () => {
  const mutation = useMutation<void, Error, userDataType>({
    mutationFn: async body => {
      console.log(body, 'bodybodybody');
      const response = await createUserProfile(body);

      return response;
    },
  });

  return mutation;
};
const useUpdateUser = () => {
  // const query = useQueryClient();
  const userData = useAppStore(state => state.userData);
  const navigation = useNavigation();

  const mutation = useMutation<void, Error, {id: string; body: any}>({
    mutationFn: async ({id, body}) => {
      console.log(body, 'bodybodybody');
      const response = await updateUserProfile(id, body);
      return response;
    },

    onSuccess: (res: any, context: any) => {
      console.log('Context here', context);
      console.log('Context here123', context?.body?.showMapPost);

      console.debug('🚀 ~ file: userMutation.ts:27 ~ useUpdateUser ~ res:', res);
      useAppStore.getState().updateUserData(res.data);
      if (userData?.accountStatus === 'ACTIVE') {
        if (context?.body?.showMapPost === undefined) {
          navigation.goBack();
          Toast.show(`${t('userDataUpdated')}`, Toast.LONG);
        } else {
          Toast.show(`${t('userMapDataUpdated')}`, Toast.LONG);
        }
      }
    },

    onError: err => {
      console.error(err.message, 'error HERE 123');
      if (err.message === 'profileDescription must not be more than 300 characters') {
        Toast.show(`${t('profileBio')}`, Toast.LONG);
      } else if (err.message === 'profileDescription should not be empty') {
        Toast.show(`${t('profileBioEmpty')}`, Toast.LONG);
      } else {
        Toast.show(err.message || 'Something went wrong', Toast.LONG);
      }
    },
  });

  return mutation;
};
const useUpdateUserFCM = () => {
  // const query = useQueryClient();
  const userData = useAppStore(state => state.userData);
  const navigation = useNavigation();

  const mutation = useMutation<void, Error, {id: string; body: any}>({
    mutationFn: async ({id, body}) => {
      console.log(body, 'bodybodybody');
      const response = await updateUserFCM(id, body);
      return response;
    },

    onSuccess: (res: any) => {
      console.debug('🚀 ~ file: userMutation.ts:27 ~ useUpdateUserFCM ~ res:', res);
      // useAppStore.getState().updateUserData(res.data);
      // if (userData?.accountStatus === 'ACTIVE') {
      //   navigation.goBack();
      //   Toast.show(`${t('userDataUpdated')}`, Toast.LONG);
      // }
    },

    onError: err => {
      console.error(err.message, 'error');
      Toast.show(err.message || 'Something went wrong', Toast.LONG);
    },
  });

  return mutation;
};
const useUploadProfilePicture = (callBack: any) => {
  // const query = useQueryClient();

  const mutation = useMutation<any>({
    mutationFn: async ({id, body}: any) => {
      console.log(id, body, 'bodybodybody');
      const response = await updateUserProfilePicture(id, body);
      console.debug('🚀 ~ file: userMutation.ts:45 ~ mutationFn: ~ response:', response);
      return response;
    },

    onSuccess: async (res: any, variables: any) => {
      console.debug('🚀 ~ file: userMutation.ts:50 ~ useUploadProfilePicture ~ res:', variables, res.data.data);
      const urlData = res.data?.data;
      console.debug('🚀 ~ file: userMutation.ts:52 ~ onSuccess: ~ urlData:', urlData);
      const myHeaders = new Headers();
      console.debug(
        '🚀 ~ file: userMutation.ts:74 ~ onSuccess: ~ variables?.body?.fileType:',
        variables?.body?.fileType,
      );
      myHeaders.append('Content-Type', variables?.body?.fileType);
      const file = variables?.fileData;
      console.debug('🚀 ~ file: userMutation.ts:57 ~ onSuccess: ~ file:', file);
      const requestOptions: any = {
        method: 'PUT',
        headers: myHeaders,
        body: file,
        redirect: 'follow',
      };

      // UPLOADING FILE
      console.debug('🚀 ~ file: userMutation.ts:64 ~ onSuccess: ~ urlData.putUrl:', urlData.getUrl, requestOptions);
      const fileUploadResponse = await fetch(urlData.putUrl, requestOptions);
      console.log('REPONSE[FILE_UPLOAD_RESPONSE]', fileUploadResponse);
      callBack(urlData.getUrl);
      // const requestData = {
      //   userId: variables.id,
      //   profileImage: urlData.getUrl,
      // };
      return urlData.getUrl;
      // useAppStore.getState().updateUserData(res.data);
    },

    onError: err => {
      console.debug('🚀 ~ file: userMutation.ts:54 ~ useUploadProfilePicture ~ err5:', err);
      console.error(err.message, 'error');
      Toast.show(err.message || 'Something went wrong', Toast.LONG);
    },
  });

  return mutation;
};

const useCreateReport = () => {
  // const query = useQueryClient();

  const mutation = useMutation<void, Error, createReportType>({
    mutationFn: async body => {
      const response = await createUserReport(body);
      return response;
    },

    onSuccess: (res: any) => {
      console.debug('🚀 ~ file: userMutation.ts:27 ~ useUpdateUser ~ res:', res);
      // useAppStore.getState().updateUserData(res.data);
    },

    onError: err => {
      console.error(err.message, 'error');
      Toast.show(err.message || 'Something went wrong', Toast.LONG);
    },
  });

  return mutation;
};

const useToggleBlockedUser = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const mutation = useMutation<void, Error, {id: string; blockedId: string; type?: string}>({
    mutationFn: async ({id, blockedId}) => {
      const response = await toggleBlockedUser(id, {blockedId});
      // const response = await {};
      return response;
    },
    onMutate: async body => {
      const key = [queryKey.GET_USER];

      const previousData = queryClient.getQueryData(key);
      console.debug('🚀 ~ useToggleBlockedUser ~ previousData:', previousData);

      const updatedData = queryClient.setQueryData(key, (oldData: any) => {
        const {blockedUsers = []} = oldData.data;
        const isBlocked = blockedUsers.includes(body.blockedId);

        return {
          ...oldData,
          data: {
            ...oldData.data,
            blockedUsers: isBlocked
              ? blockedUsers.filter((val: string) => val !== body.blockedId)
              : [...blockedUsers, body.blockedId],
          },
        };
      });

      useAppStore.getState().updateUserData(updatedData.data);

      return {
        previousData,
      };
    },

    onSuccess: (res: any, body) => {
      console.debug('🚀 ~ file: userMutation.ts:27 ~ useUpdateUser ~ res:', res);

      if (body.type === 'unblock') {
        const key = [queryKey.GET_BLOCKED_USER];
        queryClient.setQueryData(key, (oldData: any) => {
          return {
            ...oldData,
            data: {...oldData.data, blockedUsers: oldData.data.blockedUsers.filter(val => val._id !== body.blockedId)},
          };
        });
      } else {
        // resetStack('HomeStackScreens', 'BottomTab');
        navigation.pop(2);
      }
    },

    onError: (err, body, context) => {
      console.error(err.message, 'error');
      Toast.show(err.message || 'Something went wrong', Toast.LONG);
      if (context.previousData) {
        if (body.type !== 'unblock') {
          const key = [queryKey.GET_USER];
          // Revert back to the previous data if available
          queryClient.setQueryData(key, context.previousData);
          useAppStore.getState().updateUserData(context.previousData.data);
        }
      }
    },

    onSettled: (res, error, body) => {
      if (body.type === 'unblock') {
        const key = [queryKey.GET_BLOCKED_USER];
        queryClient.invalidateQueries({queryKey: key});
      }
    },
  });

  return mutation;
};

const useDeleteUser = () => {
  const mutation = useMutation<void, Error, {id: string}>({
    mutationFn: async ({id}) => {
      await deleteUser(id);
    },
  });

  return mutation;
};

export {
  useCreateReport,
  useDeleteUser,
  useCreateUser,
  useToggleBlockedUser,
  useUpdateUser,
  useUpdateUserFCM,
  useUploadProfilePicture,
};
