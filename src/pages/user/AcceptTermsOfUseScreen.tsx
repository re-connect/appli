import * as React from 'react';
import Screen from '../../components/Screen';
import { StyleSheet, View } from 'react-native';
import PdfComponent from '../../components/UI/Pdf';
import RoundedButton from '../../components/UI/RoundedButton';
import { TermsOfUseScreenProps } from '../../routing/routes/types/Auth';
import { useLogin } from '../../hooks/UserHooks';

const styles = StyleSheet.create({
  subtitle: { paddingTop: 16, paddingBottom: 32, justifyContent: 'center', alignItems: 'center' },
});

const AcceptTermsOfUseScreen: React.FC<TermsOfUseScreenProps> = ({ route }) => {
  const { triggerLogin } = useLogin();
  
  return (
    <Screen>
      <PdfComponent uri="https://www.reconnect.fr/cgs" />
      <View style={styles.subtitle}>
        <RoundedButton
          onPress={() => triggerLogin({...route.params, _accept_terms_of_use: true})}
          text='accept'
          fontSize={16}
          wrapperStyle={{paddingHorizontal: 10}}
        />
      </View>
    </Screen>
);
}

export default AcceptTermsOfUseScreen;
