import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import utf8 from 'utf8';
import { connexionInformation, loginApiEndpoint } from '../appConstants';
import { checkNetworkConnection } from './networking';
import prompt from 'react-native-prompt-android';
import t from './translation';
import { Alert } from 'react-native';
import * as RootNavigation from '../RootNavigation';

interface LoginParams {
  username: string;
  password: string;
  client_id?: string;
  client_secret?: string;
  grant_type?: string;
  _auth_code?: string;
}

interface PartialAuthBody {
  login: 'success' | 'failure';
  two_factor_complete?: boolean;
  weak_password?: boolean;
  expired_password?: boolean;
  cgs_not_accepted?: boolean;
}

const setTokenInStorage = async (token: string) => await AsyncStorage.setItem('accessToken', token);

const handleMfa = async (params: LoginParams, success: boolean, resolve: () => Promise<void>): Promise<void> => {
  if (!success) {
    Alert.alert(t.t('wrong_code'));
    resolve();
  }

  prompt(
    t.t('mfa_code_sent'),
    '',
    [
      { text: t.t('cancel'), onPress: () => resolve(), style: 'cancel' },
      {
        text: t.t('validate'),
        onPress: async auth_code => {
          await retryLogin({ ...params, _auth_code: auth_code });
          resolve();
        },
      },
    ],
    { cancelable: false },
  );
};

const handleResetPassword = async (params: LoginParams, subtitle: string): Promise<void> => {
  RootNavigation.navigate('PublicResetPassword', { username: params.username, subtitle });
};

const handleAcceptTermsOfUse = async (params: LoginParams): Promise<void> => {
  RootNavigation.navigate('AcceptTermsOfUse', { username: params.username, password: params.password });
};

const handlePartialAuth = async (params: LoginParams, response: PartialAuthBody): Promise<void> =>
  new Promise((resolve: any) => {
   if (response.two_factor_complete === false) {
      handleMfa(params, response.login === 'success', resolve);
    } else if (response.weak_password === true) {
      handleResetPassword(params, 'reset_password_weak_subtitle');
      resolve();
    } else if (response.expired_password === true) {
      handleResetPassword(params, 'reset_password_expired_subtitle');
      resolve();
    } else if (response.cgs_not_accepted === true) {
      handleAcceptTermsOfUse(params);
      resolve();
    } else {
      resolve();
    }
  });

const retryLogin = async (params: LoginParams): Promise<void> => {
  try {
    const response = await axios.get(loginApiEndpoint, { params, timeout: 15000 });
    const token = response.data?.access_token;

    if (token) {
      await setTokenInStorage(token);
    } else {
      await handlePartialAuth(params, response.data);
    }
  } catch (e) {
    if (503 === e.response.status) {
      Alert.alert(t.t('maintenance'));

      return;
    }

    throw e;
  }
};

export const login = async (username: string, password: string, additionalParams: object = {}): Promise<void> => {
  const hasNetwork = await checkNetworkConnection();
  if (!hasNetwork) {
    return;
  }

  const params = {
    ...connexionInformation,
    ...additionalParams,
    username: username.toLowerCase().normalize('NFD').trim(),
    password: password.trim(),
  };

  try {
    await retryLogin(params);
  } catch (error: any) {
    await retryLogin(params);
  }
};
