const getUniqueIdentifier = () => {
  switch (process.env.ENV) {
    case 'debug': return 'com.reconnect.CloudSolidaire.debug';
    case 'preprod': return 'com.reconnect.CloudSolidaire.preprod';
    default: return 'com.reconnect.prod.debug';
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
