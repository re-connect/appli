import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useResetPassword } from '../../hooks/UserHooks';
import RoundedButton from '../UI/RoundedButton';
import PasswordValidityWidget from './PasswordValidityWidget';
import Shape from '../../helpers/forms/resetPasswordShape';
import FormikTextField from '../UI/FormikTextField';
import Separator from '../UI/Separator';
import { ResetPasswordData } from '../../types/Users';

type Props = {
  username: string;
};

const PublicResetPasswordForm: React.FC<Props> = ({ username }) => {
  const { isResetting, reset } = useResetPassword(username);
  const initialValues = { password: '', confirm: '' };

  return (
    <Formik validationSchema={Shape} onSubmit={values => reset(values)} initialValues={initialValues}>
      {(formikBag: FormikProps<ResetPasswordData>) => (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
          <Separator height={4} />
          <FormikTextField
            contentType="password"
            displayError
            formikBag={formikBag}
            icon="key"
            label="current_password"
            name="currentPassword"
          />
          <FormikTextField
            contentType="password"
            displayError
            formikBag={formikBag}
            icon="key"
            label="new_password"
            name="password"
          />
          <PasswordValidityWidget password={formikBag.values.password} />
          <FormikTextField
            contentType="password"
            displayError
            formikBag={formikBag}
            icon="key"
            label="confirm_password"
            name="confirm"
          />
          <RoundedButton
            isLoading={isResetting}
            disabled={!formikBag.isValid}
            iconName="save"
            text="update"
            onPress={() => formikBag.handleSubmit()}
          />
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default PublicResetPasswordForm;
