import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '../../UI/Icon';
import { colors } from '../../../style';
import { useBoolean } from 'react-hanger/array';
import DocumentContext from '../../../context/DocumentContext';
import { hasPrivateParent } from '../../../helpers/documentsHelper';
import FolderContext from '../../../context/FolderContext';
import TogglePrivacySwitch from '../../UI/TogglePrivacySwitch';
import { DocumentInterface } from '../../../types/Documents';
import DocumentActionsModal from '../DocumentActionsModal';

const styles = StyleSheet.create({
  actionsButton: {
    zIndex: 2,
    borderColor: colors.black,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 10,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topButton: { position: 'absolute', right: 20, top: 40 },
  bottomButton: { position: 'absolute', right: 20, bottom: 20, paddingHorizontal: 4, },
  bottomCenteredActionsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 20,
    zIndex: 1,
  },
});

interface Props {
  document: DocumentInterface;
}

const FullScreenImageActions: React.FC<Props> = ({ document }) => {
  const [isModalOpen, openModalActions] = useBoolean(false);
  const { goBack } = useNavigation();
  const { list: folders } = React.useContext(FolderContext);

  return <>
    <TouchableOpacity style={{...styles.actionsButton, ...styles.topButton}} onPress={() => goBack()}>
      <Icon color={colors.black} name='x' style={{ fontSize: 20 }} />
    </TouchableOpacity>
    <DocumentActionsModal document={document} visible={isModalOpen} setVisible={openModalActions.setValue} />
    <TouchableOpacity style={{...styles.actionsButton, ...styles.bottomButton}} onPress={() => openModalActions.setTrue()}>
      <Icon color={colors.black} name='ellipsis-vertical' style={{ fontSize: 20 }} />
    </TouchableOpacity>
    {hasPrivateParent(folders, document.folder_id) ? null :
      <View style={styles.bottomCenteredActionsContainer}>
        <View style={styles.actionsButton}>
          <TogglePrivacySwitch Context={DocumentContext} isPrivate={document.b_prive} itemId={document.id} endpoint={`documents/${document.id}`} />
      </View>
    </View>}
    </>
};

export default FullScreenImageActions;
