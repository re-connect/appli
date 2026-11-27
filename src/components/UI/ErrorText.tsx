import { FormikErrors } from 'formik';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../style';
import Text from './Text';

const style = StyleSheet.create({
  text: { marginLeft: 32, marginTop: 8, color: colors.red },
});

interface Props {
  text: FormikErrors<Date> | string;
}

const ErrorText: React.FC<Props> = ({ text }) => (
  // Announced as soon as it appears, like the TextField errors (RAAM 7.10)
  <Text style={style.text} accessibilityLiveRegion='polite'>
    {text as string}
  </Text>
);

export default ErrorText;
