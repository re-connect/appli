import 'dotenv/config';

const getUniqueIdentifier = () => {
  switch (process.env.ENV) {
    case 'debug': return 'com.reconnect.CloudSolidaire.debug';
    case 'preprod': return 'com.reconnect.CloudSolidaire.preprod';
    default: return 'com.reconnect.CloudSolidaire.debug';
  }
};

const getAppName = () => {
  switch (process.env.ENV) {
    case 'debug': return 'Reconnect (Dev)';
    case 'preprod': return 'Reconnect (Preprod)';
    default: return 'Reconnect';
  }
};

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV,
      EXPO_PUBLIC_GENIUS_KEY: process.env.EXPO_PUBLIC_GENIUS_KEY,
      EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
      EXPO_PUBLIC_CLIENT_ID: process.env.EXPO_PUBLIC_CLIENT_ID,
      EXPO_PUBLIC_CLIENT_SECRET: process.env.EXPO_PUBLIC_CLIENT_SECRET,
      EXPO_PUBLIC_CRISP_WEBSITE_ID: process.env.EXPO_PUBLIC_CRISP_WEBSITE_ID,
      EXPO_PUBLIC_SENTRY_SECRET: process.env.EXPO_PUBLIC_SENTRY_SECRET,
    },
    name: getAppName(),
    ios: {
      buildNumber: process.env.APP_VERSION,
      bundleIdentifier: getUniqueIdentifier(),
      infoPlist: { UIBackgroundModes: ["audio"] }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      versionCode: process.env.APP_VERSION,
      package: getUniqueIdentifier(),
    },
  }
};
