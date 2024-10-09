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
  actions: {
    pickFolder: () => void;
    delete: () => void;
    view: () => void;
    moveOut: () => void;
    showRenameForm: () => void;
    showSendEmailForm: () => void;
  };
}
interface ActionItemProps {
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

const ActionsModalContent: React.FC<Props> = ({ document, actions }) => {
  const items: ActionItemProps[] = [
    { action: actions.showSendEmailForm, label: 'send_by_email', icon: 'paper-plane', condition: !document.is_folder },
    { action: actions.pickFolder, label: 'move_to_folder', icon: 'folder', condition: !document.is_folder },
    { action: actions.moveOut, label: 'move_out_of_folder', icon: 'folder', condition: !!document.folder_id },
    { action: actions.showRenameForm, color: colors.green, label: 'rename', icon: 'pen' },
    { action: actions.delete, color: colors.red, label: 'delete', icon: 'trash' },
  ];

  if (!document.is_folder) {
    items.push({ action: actions.view, color: colors.yellow, label: 'Download', icon: 'download' });
  }

  return <View>
    {items.map(({ action, color, label, icon, condition }) => (
      <ActionItem action={action} color={color} label={label} icon={icon} condition={condition} key={label} />
    ))}
  </View>;
};

export default ActionsModalContent;
