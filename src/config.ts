const getGeniusScanKey = () => {
  switch (process.env.EXPO_PUBLIC_ENV) {
    case 'debug': return process.env.EXPO_PUBLIC_GENIUS_KEY;
    case 'preprod': return process.env.GENIUS_KEY_PREPROD;
    default: return process.env.GENIUS_KEY_PROD;
  }
}

const getSecret = (key) => {
  switch (process.env.EXPO_PUBLIC_ENV) {
    case 'debug': return process.env[`EXPO_PUBLIC_${key}`];
    default: return process.env[key];
  }
}

const getBackendUrl = () => `https://${process.env.EXPO_PUBLIC_ENV === 'prod' ? '' : 'preprod.'}reconnect.fr`;

const config = {
  crispWebsiteId: getSecret('CRISP_WEBSITE_ID'),
  sentrySecret: getSecret('SENTRY_SECRET'),
  connexionInformation: {
    client_id: getSecret('CLIENT_ID'),
    client_secret: getSecret('CLIENT_SECRET'),
    grant_type: 'password',
  },
  geniusSdkLicense: getGeniusScanKey(),
  version: process.env.EXPO_PUBLIC_APP_VERSION,
  ENV: process.env.EXPO_PUBLIC_ENV,
  backendUrl: getBackendUrl(),
};
 
console.log('config', config);

export { config };