export const config = {
  crispWebsiteId: process.env.EXPO_PUBLIC_CRISP_WEBSITE_ID,
  sentrySecret: process.env.EXPO_PUBLIC_SENTRY_SECRET,
  connexionInformation: {
    client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
    client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
    grant_type: 'password',
  },
  geniusSdkLicense: process.env.EXPO_PUBLIC_GENIUS_SDK_LICENSE,
  version: process.env.EXPO_PUBLIC_APP_VERSION,
};
 