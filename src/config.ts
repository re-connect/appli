const config = {
  crispWebsiteId: process.env.EXPO_PUBLIC_CRISP_WEBSITE_ID,
  sentrySecret: process.env.EXPO_PUBLIC_SENTRY_SECRET,
  connexionInformation: {
    client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
    client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
    grant_type: 'password',
  },
  geniusSdkLicense: process.env.EXPO_PUBLIC_GENIUS_KEY,
  env: process.env.EXPO_PUBLIC_ENV,
  backendUrl: `https://${process.env.EXPO_PUBLIC_ENV === 'prod' ? '' : 'preprod.'}reconnect.fr`,
};

export { config };
