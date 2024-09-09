import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiv2Endpoint, apiv3Endpoint, backendUrl } from '../appConstants';
import { handle401, handleError } from './errors';
import { checkNetworkConnection } from './networking';

type HTTPVerb = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

const buildUrl = async (baseUrl: string, endpoint: string) => {
  const isConnected = await checkNetworkConnection();
  if (!isConnected) {
    return;
  }

  return `${baseUrl}${endpoint}`;
}

const authenticateUrl = async (url: string) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) {
    handle401();

    return;
  }

  return `${url}?access_token=${token}`;
}

const buildAuthenticatedUrl = async (baseUrl: string, endpoint: string) => {
  const unauthenticatedUrl = await buildUrl(baseUrl, endpoint);

  return await authenticateUrl(unauthenticatedUrl);
}

export const buildAuthenticatedUrlv2 = async (endpoint: string) => await buildAuthenticatedUrl(apiv2Endpoint, endpoint);

const buildAuthenticatedUrlv3 = async (endpoint: string) => await buildAuthenticatedUrl(apiv3Endpoint, endpoint);

export const makeRequest = async (url?: string, method: HTTPVerb = 'GET', data?: Record<string, any>) => {
  try {
    if (url) {
      const response = await axios({ method, url, data, timeout: 17000 });

      return response.data;
    }

    return null;
  } catch (error: any) {
    handleError(error);

    return null;
  }
}

export const makeRequestv2 = async (endpoint: string, method: HTTPVerb = 'GET', data?: Record<string, any>) => {
  const url = await buildAuthenticatedUrlv2(endpoint);

  return await makeRequest(url, method, data);
};

export const makeRequestv3 = async (endpoint: string, method: HTTPVerb = 'GET', data?: Record<string, any>) => {
  const url = await buildAuthenticatedUrlv3(endpoint);

  return await makeRequest(url, method, data);
};

export const makePublicRequest = async (endpoint: string) => {
  const url = await buildUrl(backendUrl, `/public${endpoint}`);

  return await makeRequest(url);
};
