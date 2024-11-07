import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }) => ({
  ...config,
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    googleServicesFile: './android/google-services.json',
  },
  updates: {
    url: "https://u.expo.dev/a689101c-73a8-4b5a-acf5-ab026524c88c",
    channel: process.env.EXPO_PUBLIC_ENV,
  },
});
