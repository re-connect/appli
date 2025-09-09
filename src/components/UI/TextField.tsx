import { FormikErrors, FormikTouched } from 'formik';
import * as React from 'react';
import { Dimensions, KeyboardType, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useBoolean } from 'react-hanger/array';
import { useTranslation } from 'react-i18next';
import { colors } from '../../style';
import Icon from './Icon';
const DEVICE_WIDTH = Dimensions.get('window').width;
const IS_LITTLE_DEVICE = DEVICE_WIDTH <= 375;

const styles = StyleSheet.create({
  icon: { marginHorizontal: 4 },
  error: { color: colors.red },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 3,
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
  },
  input: {
    paddingLeft: 16,
    width: '100%',
    height: 48,
    paddingRight: IS_LITTLE_DEVICE && Platform.OS === 'android' ? 32 : 16,
    fontSize: IS_LITTLE_DEVICE ? 16 : 18,
  },
  inputWithRightIcon: {
    paddingRight: 50,
  },
});

export interface TextFieldProps {
  autocompleteType?: any;
  contentType?: any;
  disabled?: boolean;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  fieldLabel?: string;
  handleBlur?: any;
  handleChange?: any;
  iconName?: string;
  iconSyle?: any;
  keyboardType?: KeyboardType;
  okIcon?: boolean;
  onFocus?: () => void;
  style?: any;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  value?: string;
  leftElement?: React.ReactElement;
  displayError?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  autocompleteType,
  contentType,
  disabled,
  error,
  displayError,
  fieldLabel,
  handleBlur,
  handleChange,
  iconName,
  iconSyle,
  keyboardType,
  okIcon,
  onFocus,
  style,
  touched,
  leftElement,
  value,
}) => {
  const { t } = useTranslation();
  const [showPassword, showPasswordActions] = useBoolean(false);
  error = !error ? '' : Array.isArray(error) ? error.join(', ') : error;
  const hasError = !!touched && !!error;
  let showRightIcon = !!touched && okIcon;
  style = { color: colors.darkGray, borderColor: hasError ? colors.red : colors.darkGray, ...style };

  const leftIconStyle = { ...styles.icon, color: colors.darkGray, ...iconSyle };
  let rightIconColor = !hasError ? colors.green : colors.red;

  let rightIconName = !!okIcon && !hasError ? 'check' : 'xmark';
  if (contentType === 'password') {
    rightIconColor = colors.darkGray;
    rightIconName = 'eye';
    showRightIcon = true;
  }
  const rightIconStyle = { color: rightIconColor, right: 60 };
  return (
    <View>
      <View style={[styles.inputContainer, style]}>
        {leftElement ? leftElement : !iconName ? null : <Icon style={leftIconStyle} name={iconName} />}
        <TextInput
          style={[styles.input,showRightIcon && styles.inputWithRightIcon, style]}
          autoCapitalize="none"
          autoComplete={!autocompleteType ? 'off' : autocompleteType}
          editable={!disabled}
          keyboardType={keyboardType}
          onBlur={handleBlur}
          onChangeText={handleChange}
          onFocus={onFocus}
          placeholder={t(fieldLabel ?? '')}
          placeholderTextColor={colors.darkGray}
          secureTextEntry={contentType === 'password' && !showPassword}
          textContentType={contentType}
          value={!value ? '' : value}
        />
        {showRightIcon ? (
          <Icon name={rightIconName} style={rightIconStyle} onPress={showPasswordActions.toggle} />
        ) : null}
      </View>
      {displayError && hasError && (
        <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
          <Text style={styles.error}>{error as string}</Text>
        </View>
      )}
    </View>
  );
};

export default TextField;
