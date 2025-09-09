import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import t from './translation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handle401 = (): void => {
  AsyncStorage.removeItem('accessToken');
};

export const handleError = (error: AxiosError): void => {
  if (error.response?.status == 401) {
    handle401();
  } else if (error.response?.status == 403) {
    Alert.alert(t.t('error_not_allowed'));
  }
};
