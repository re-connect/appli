import { FormikProps } from 'formik';
import * as React from 'react';
import { colors } from '../../style';
import { UserField } from '../../types/Users';
import SecretQuestionPicker from '../Beneficiaries/SecretQuestionPicker';
import PhoneInputField from './PhoneInputField';
import { ProfileItemInterface } from './ProfileItem';
import TextField from './TextField';

// Purpose of the user's own fields, for autofill (RAAM 5.7)
const profileContentType: Partial<Record<UserField, string>> = {
  nom: 'familyName',
  prenom: 'givenName',
  email: 'emailAddress',
};

interface Props {
  item: ProfileItemInterface;
  formikBag: FormikProps<Record<UserField, string>>;
}

const ProfileItemForm: React.FC<Props> = ({ item: { field, iconName, label }, formikBag }) => {
  const error = formikBag.errors[field];
  const touched = formikBag.touched[field];
  const value = formikBag.values[field];
  const handleBlur = formikBag.handleBlur(field);
  const handleChange = formikBag.handleChange(field);

  if (field === 'question_secrete') {
    return <SecretQuestionPicker fieldName='question_secrete' />;
  }

  if (field === 'telephone') {
    return (
      <PhoneInputField
        error={error}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        okIcon
        value={value}
      />
    );
  }

  return (
    <TextField
      error={error}
      touched={touched}
      fieldLabel={label ?? ''}
      handleChange={handleChange}
      handleBlur={handleBlur}
      iconName={iconName ?? 'question'}
      contentType={profileContentType[field]}
      okIcon
      iconSyle={{ color: colors.darkGray }}
      value={value}
    />
  );
};

export default ProfileItemForm;
