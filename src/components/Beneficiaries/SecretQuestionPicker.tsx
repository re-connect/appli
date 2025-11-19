import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, ActionSheetIOS, Platform, TouchableOpacity, Text } from 'react-native';
import { useFetchSecretQuestions } from '../../hooks/BeneficiariesHooks';
import { colors } from '../../style';
import RNPickerSelect from 'react-native-picker-select';
import { useField } from 'formik';
import Icon from '../UI/Icon';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 32,
    backgroundColor: colors.white,
    borderRadius: 48,
    height: 48,
    borderColor: colors.darkGray,
    borderWidth: 1,
    justifyContent: 'center',
  },
  icon: { position: 'absolute', top: 16, left: 16 },
  touchableIOS: {
    height: 48,
    padding: 10,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  textIOS: {
    fontSize: 16,
    color: colors.darkGray,
    lineHeight: 28,
  },
});

const SecretQuestionPicker: React.FC<{ fieldName: string }> = ({ fieldName }) => {
  const { t } = useTranslation();
  const { secretQuestionList } = useFetchSecretQuestions();
  const secretQuestionsForPicker = secretQuestionList.map(item => {
    return { label: item, value: t(item) };
  });
  const [field,, helpers] = useField(fieldName);
  const [selectedLabelIOS, setSelectedLabelIOS] = React.useState(t('secret_question'));

  const showActionSheetIOS = () => {
    const options = [t('secret_question'), ...secretQuestionList.map(item => t(item))];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 0,
        tintColor: colors.darkGray,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          helpers.setValue('');
          setSelectedLabelIOS(t('secret_question'));
        } else {
          const selectedQuestion = secretQuestionList[buttonIndex - 1];
          helpers.setValue(selectedQuestion);
          setSelectedLabelIOS(t(selectedQuestion));
        }
      },
    );
  };

  React.useEffect(() => {
    if (field.value) {
      setSelectedLabelIOS(t(field.value));
    }
  }, [field.value, t]);

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.wrapper}>
        <Icon name="question" size={16} color={colors.darkGray} style={styles.icon} />
        <TouchableOpacity style={styles.touchableIOS} onPress={showActionSheetIOS}>
          <Text style={styles.textIOS}>{selectedLabelIOS}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Icon name="question" size={16} color={colors.darkGray} style={styles.icon} />
      <RNPickerSelect
        onValueChange={value => helpers.setValue(value)}
        items={secretQuestionsForPicker}
        placeholder={{ label: t('secret_question'), value: '' }}
      />
    </View>
  );
};

export default SecretQuestionPicker;
