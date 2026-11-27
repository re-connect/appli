import { ArrayHelpers } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import { colors } from '../../style';
import DateTimePicker from '../UI/DateTimePicker';
import IconButton from '../UI/IconButton';
import Separator from '../UI/Separator';
import { dateToIso } from '../../helpers/dateHelpers';

interface Props {
  reminder: string;
  arrayHelpers: ArrayHelpers;
  index: number;
  handleBlur: (field: string) => void;
}

const ReminderForm: React.FC<Props> = ({ reminder, arrayHelpers, index, handleBlur }) => {
  const { t } = useTranslation();
  const onChange = (value: string) => {
    arrayHelpers.replace(index, value);
    handleBlur('rappels');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.reminder}>
        <DateTimePicker labelPrefix={t('a11y_reminder')} value={reminder} handleChange={(value: Date) => onChange(dateToIso(value))} />
        <Separator width={1} />
      </View>
      <IconButton
        backgroundColor='transparent'
        size={40}
        iconName='trash-alt'
        accessibilityLabel='a11y_delete_reminder'
        iconColor={colors.red}
        onPress={() => arrayHelpers.remove(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reminder: {
    ...Platform.select({ android: { flex: 1 } }),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
    marginLeft: Platform.OS === 'ios' ? 0 : 5,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ReminderForm;
