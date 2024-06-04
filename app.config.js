const getUniqueIdentifier = () => {
  if (process.env.ENV === 'debug') {
    return 'com.reconnect.CloudSolidaire.debug';
  }

  if (process.env.ENV === 'preprod') {
    return 'com.reconnect.CloudSolidaire.preprod';
  }

  return 'com.reconnect.CloudSolidaire.prod';
};

const getAppName = () => {
  if (process.env.ENV === 'debug') {
    return 'Reconnect (Dev)';
  }

  if (process.env.ENV === 'preprod') {
    return 'Reconnect (Preprod)';
  }

  return 'Reconnect';
};

const versionCode = '174';

module.exports = ({ config }) => {
  return {
    ...config,
    name: getAppName(),
    ios: {
      buildNumber: versionCode,
      bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      versionCode: versionCode,
      package: getUniqueIdentifier(),
    },
  }
};
