import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }) => ({
  ...config,
  ios: {
    buildNumber: '177',
    bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_ID,
    infoPlist: { 
      UIBackgroundModes: ['audio']
    }
  },
  android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      versionCode: '177',
      package: process.env.EXPO_PUBLIC_BUNDLE_ID,
    },
});
