import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import * as React from 'react';
import { colors } from '../style';
import { SettingsButton, TabBarButton } from './Components';
import { getTabStackIcon } from '../services/navigation';
import { isMember } from '../helpers/userHelpers';

const settingsScreens = ['Chat', 'Profile', 'SettingsIndex', 'Centers', 'TermsOfUse', 'LegalNotices', 'PrivacyPolicy', 'Pitches'];

export const getTabScreenOptions =
  (t: any) =>
    ({ route }: { route: RouteProp<ParamListBase, string> }) => ({
      tabBarIcon: getTabStackIcon(route),
      tabBarButton: TabBarButton,
      tabBarLabel: t(route.name.toLowerCase()),
      tabBarActiveTintColor: isMember ? colors.primaryPro : colors.primary,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: 'white',
      },
    });

export const getHeader =
  (title: string) =>
    ({ navigation, route }: { navigation: NavigationProp<any, any>, route: RouteProp<any, any> }) => ({
      title,
      headerStyle: { backgroundColor: isMember ? colors.blue : colors.green },
      headerTintColor: colors.white,
      headerRight: settingsScreens.includes(route.name) ? undefined : () => <SettingsButton navigation={navigation} />,
    });
