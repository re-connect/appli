import { NavigationProp, RouteProp } from '@react-navigation/native';

type PublicResetPasswordScreenParams = { username: string; subtitle: string };
export type PublicResetPasswordScreenProps = {
  route: RouteProp<{ PublicResetPassword: PublicResetPasswordScreenParams }, 'PublicResetPassword'>;
};

type TermsOFUseScreenParams = { username: string; password: string };
export type TermsOfUseScreenProps = {
  route: RouteProp<{ TermsOfUse: TermsOFUseScreenParams }, 'TermsOfUse'>;
};

export type AuthStackParamList = {
  Login: {};
  PublicResetPassword: PublicResetPasswordScreenParams;
  TermsOfUse: TermsOfUseScreenProps;
  Chat: {};
};
