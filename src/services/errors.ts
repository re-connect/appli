import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import t from './translation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../RootNavigation';

export const handle401 = (): void => {
  RootNavigation.navigate('Auth');
  AsyncStorage.removeItem('accessToken');
};

export const handleError = (error: AxiosError): void => {
  if (error.response?.status == 401) {
    handle401();
  } else if (error.response?.status == 403) {
    Alert.alert(t.t('error_not_allowed'));
  }
};
