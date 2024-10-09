import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../style';
import { DocumentInterface } from '../../../types/Documents';
import Text from '../../UI/Text';
import Icon from '../../UI/Icon';

const styles = StyleSheet.create({
  menuIcon: { fontSize: 20, paddingRight: 10, width: 30, textAlign: 'center' },
  text: { fontSize: 16, color: '#666666' },
});

interface Props {
  document: DocumentInterface;
  actions: ActionItemProps[]
}

export interface ActionItemProps {
  action: () => void;
  color?: string;
  label: string;
  icon: string;
  condition?: boolean;
}

const ActionItem: React.FC<ActionItemProps> = ({ action, label, icon, color = colors.blue, condition = true }) =>
  !condition ? null : (
    <TouchableOpacity onPress={action}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Icon style={styles.menuIcon} color={color} name={icon} />
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

const ActionsModalContent: React.FC<Props> = ({ document, actions }) => (
  <View>
    {actions.map(({ action, color, label, icon, condition }) => (
      <ActionItem action={action} color={color} label={label} icon={icon} condition={condition} key={label} />
    ))}
  </View>
);

export default ActionsModalContent;
