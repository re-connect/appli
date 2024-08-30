import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }) => ({
  ...config,
  ios: {
    buildNumber: '100000202',
    bundleIdentifier: 'com.reconnect.CloudSolidaire' + process.env.EXPO_PUBLIC_ENV,
    infoPlist: { 
      UIBackgroundModes: ['audio']
    }
  },
  android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      versionCode: '100000202',
      package: 'com.reconnect.CloudSolidaire' + process.env.EXPO_PUBLIC_ENV,
      googleServicesFile: './android/google-services-notif.json'
    },
});
