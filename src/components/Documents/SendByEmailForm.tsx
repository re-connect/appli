import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import emailShape from '../../helpers/forms/emailShape';
import { useSendDocumentByEmail } from '../../hooks/DocumentsHooks';
import { colors } from '../../style';
import { DocumentInterface } from '../../types/Documents';
import Text from '../UI/Text';
import TextField from '../UI/TextField';
import Icon from '../UI/Icon';
import ContactContext from '../../context/ContactContext';
import { ContactInterface } from '../../types/Contact';
import IconButton from '../UI/IconButton';

interface Props {
  document: DocumentInterface;
  onSubmit: () => void;
  close: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 64,
    paddingHorizontal: 32,
    backgroundColor: colors.darkGrayTransparent,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  content: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    padding: 32,
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: { fontSize: 20 },
  menuIconContainer: {
    marginRight: 8,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    padding: 18,
    borderRadius: 10,
  },
  wrapperButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const SendByEmailForm: React.FC<Props> = ({ document, onSubmit, close }) => {
  const { isSending, triggerSendDocumentByEmail, isSent } = useSendDocumentByEmail(document);
  const { list } = React.useContext(ContactContext);
  isSent && close();

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {isSending ? (
          <View style={styles.content}>
            <ActivityIndicator size='large' color={colors.primary} />
          </View>
        ) : (
          <View style={styles.wrapper}>
            <Formik
              onSubmit={async values => {
                await triggerSendDocumentByEmail(values.email);
                onSubmit();
              }}
              initialValues={{ email: '' }}
              validationSchema={emailShape}>
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }: FormikProps<Record<'email', string>>) => {
                return (
                  <View>
                    { list.filter((contact: ContactInterface) => contact.email).map((contact) => 
                    <View style={styles.contactRow}>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>{`${contact.prenom} ${contact.nom} : `}</Text>
                        <Text>{contact.email}</Text>
                      </View>
                      <IconButton
                        backgroundColor={colors.white}
                        iconColor={colors.primary}
                        iconName="copy"
                        onPress={() => setFieldValue('email', contact.email)}
                      />
                    </View>
                    )}
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
                    <View style={styles.wrapperButtons}>
                      <Pressable onPress={onSubmit}>
                        <View style={styles.menuIconContainer}>
                          <Icon style={styles.menuIcon} color={colors.darkGray} name='xmark' />
                        </View>
                        <Text>cancel</Text>
                      </Pressable>
                      <IconButton
                        backgroundColor={colors.blue}
                        iconName="paper-plane"
                        onPress={() => handleSubmit()}
                      />
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SendByEmailForm;
