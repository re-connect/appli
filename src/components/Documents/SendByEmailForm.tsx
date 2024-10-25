import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import emailShape from '../../helpers/forms/emailShape';
import { useSendDocumentByEmail } from '../../hooks/DocumentsHooks';
import { colors } from '../../style';
import { DocumentInterface } from '../../types/Documents';
import Text from '../UI/Text';
import TextField from '../UI/TextField';
import ContactContext from '../../context/ContactContext';
import IconButton from '../UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import { ContactInterface } from '../../types/Contact';

interface Props {
  document: DocumentInterface;
  onSubmit: () => void;
  close: () => void;
}

interface ContactRowProps {
  contact: ContactInterface;
  updateEmailInput: () => void;
}

const styles = StyleSheet.create({
  contactsTitle: {fontWeight: 'bold', textDecorationLine: 'underline', marginBottom: 16},
  contactRow: {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  wrapper: { alignItems: 'center' },
  sendButtonRow: { flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'stretch', marginTop: 20 },    
});

const ContactRow: React.FC<ContactRowProps> = ({ contact, updateEmailInput }) => <View style={styles.contactRow}>
  <View>
    <Text style={{fontWeight: 'bold'}}>{`${contact.prenom} ${contact.nom}`}</Text>
    {!contact.email ? <Text>no_email</Text> : <Text>{contact.email}</Text>}
  </View>
  {!contact.email ? null : <IconButton
    backgroundColor={colors.white}
    iconColor={colors.primary}
    iconName="copy"
    onPress={() => updateEmailInput()}
  />}
</View> 

const SendByEmailForm: React.FC<Props> = ({ document, onSubmit, close }) => {
  const { isSending, triggerSendDocumentByEmail, isSent } = useSendDocumentByEmail(document);
  const { list } = React.useContext(ContactContext);
  const { navigate } = useNavigation<any>();
  const navigateToContacts = () => {
    close();
    navigate('Contacts');
  }
  isSent && close();

  if (isSending) {
    return <ActivityIndicator size='large' color={colors.primary} />
  }

  return <Formik
    onSubmit={async values => {
      await triggerSendDocumentByEmail(values.email);
      onSubmit();
    }}
    initialValues={{ email: '' }}
    validationSchema={emailShape}>
    {({ handleBlur, handleChange, handleSubmit, setFieldValue, values, errors, touched }: FormikProps<Record<'email', string>>) => {
      return (
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={navigateToContacts}><Text style={styles.contactsTitle}>contacts</Text></TouchableOpacity>
          <View>{list.map((contact: ContactInterface) => <ContactRow contact={contact} updateEmailInput={() => setFieldValue('email', contact.email)} />)}</View>
          <TextField
            autocompleteType='email'
            contentType='emailAddress'
            error={errors.email}
            fieldLabel='email'
            handleBlur={handleBlur('email')}
            handleChange={handleChange('email')}
            iconName='at'
            keyboardType='email-address'
            okIcon
            touched={touched.email}
            value={values.email}
          />
          <View style={styles.sendButtonRow}>
            <IconButton backgroundColor={colors.blue} iconName="paper-plane" onPress={() => handleSubmit()} />
          </View>
        </View>
      );
    }}
  </Formik>
};

export default SendByEmailForm;
