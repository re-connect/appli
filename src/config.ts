import Constants from 'expo-constants';

const {
  EXPO_PUBLIC_ENV,
  EXPO_PUBLIC_APP_VERSION,
  EXPO_PUBLIC_GENIUS_KEY,
  EXPO_PUBLIC_CLIENT_ID,
  EXPO_PUBLIC_CLIENT_SECRET,
  EXPO_PUBLIC_CRISP_WEBSITE_ID,
  EXPO_PUBLIC_SENTRY_SECRET
} = Constants.expoConfig.extra;

console.log(`Env: ${EXPO_PUBLIC_ENV}`);
console.log(`Genius Key: ${EXPO_PUBLIC_GENIUS_KEY}`);
console.log(`Client ID: ${EXPO_PUBLIC_CLIENT_ID}`);
console.log(`Client Secret: ${EXPO_PUBLIC_CLIENT_SECRET}`);
console.log(`Crisp Website ID: ${EXPO_PUBLIC_CRISP_WEBSITE_ID}`);
console.log(`Sentry Secret: ${EXPO_PUBLIC_SENTRY_SECRET}`);

const config = {
  crispWebsiteId: EXPO_PUBLIC_CRISP_WEBSITE_ID,
  sentrySecret: EXPO_PUBLIC_SENTRY_SECRET,
  connexionInformation: {
    client_id: EXPO_PUBLIC_CLIENT_ID,
    client_secret: EXPO_PUBLIC_CLIENT_SECRET,
    grant_type: 'password',
  },
  geniusSdkLicense: EXPO_PUBLIC_GENIUS_KEY,
  version: EXPO_PUBLIC_APP_VERSION,
  env: EXPO_PUBLIC_ENV,
  backendUrl: `https://${EXPO_PUBLIC_ENV === 'prod' ? '' : 'preprod.'}reconnect.fr`,
};
  
console.log('config', config);

export { config };
