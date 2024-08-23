import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }) => ({
  ...config,
  ios: {
    buildNumber: '200',
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
      versionCode: '100000200',
      package: 'com.reconnect.CloudSolidaire' + process.env.EXPO_PUBLIC_ENV,
      googleServicesFile: './google-services-notif.json'
    },
});
