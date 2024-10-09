import React from 'react';
import { StyleSheet, View } from 'react-native';
import RoundedButton from '../../UI/RoundedButton';
import t from '../../../services/translation';

const styles = StyleSheet.create({
  wrapper: { marginTop: 10 },
  button: { paddingHorizontal: 30, alignContent: 'center' },
  text: { textAlign: 'center' },
});

const ItemModal: React.FC<{ label: string; onPress: () => void; iconName: string; disabled?: boolean }> = ({
  label,
  onPress,
  iconName,
  disabled,
}) => {
  return (
    <View style={styles.wrapper}>
      <RoundedButton
        text={t.t(label)}
        onPress={onPress}
        iconName={iconName}
        disabled={disabled ?? false}
        fontSize={16}
        wrapperStyle={styles.button}
        textStyle={styles.text}
      />
    </View>
  );
};

export default ItemModal;
