export const config = {
  crispWebsiteId: process.env.CRISP_WEBSITE_ID,
  sentrySecret: process.env.SENTRY_SECRET,
  connexionInformation: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'password',
  },
  geniusSdkLicense: process.env.EXPO_PUBLIC_GENIUS_SDK_LICENSE,
  version: process.env.EXPO_PUBLIC_APP_VERSION,
};
 