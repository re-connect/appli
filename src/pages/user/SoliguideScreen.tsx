import * as React from 'react';
import WebView from 'react-native-webview';

const SoliguideScreen: React.FC = () => (
  <WebView source={{ uri: 'https://soliguide.fr' }} />
);

export default SoliguideScreen;
