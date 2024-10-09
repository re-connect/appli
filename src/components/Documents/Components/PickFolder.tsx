import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import FolderContext from '../../../context/FolderContext';
import { useMoveDocumentInFolder } from '../../../hooks/DocumentsHooks';
import { colors } from '../../../style';
import { DocumentInterface } from '../../../types/Documents';
import H3 from '../../UI/H3';
import Text from '../../UI/Text';
import Icon from '../../UI/Icon';

const styles = StyleSheet.create({
  menuIcon: { fontSize: 20, marginRight: 16 },
  text: { fontSize: 18, textAlign: 'center', color: colors.darkGrayTransparent },
  hstack: { flexDirection: 'row', marginVertical: 8 },
  cancelButton: { marginTop: 16 },
});

interface Props {
  document: DocumentInterface;
  close: () => void;
  onPick: () => void;
}

const PickFolder: React.FC<Props> = ({ document, close, onPick }) => {
  const { list: folders } = React.useContext(FolderContext);
  const { isMovingIn, triggerMoveDocumentIntoFolder, hasMoved } = useMoveDocumentInFolder();
  hasMoved && close();

  return (
    <View>
      {isMovingIn ? (
        <ActivityIndicator size='large' color={colors.primary} />
      ) : (
        <>
          <H3>move_to_folder</H3>
          {folders.map((folder: DocumentInterface) => (
            <TouchableOpacity
              key={folder.id}
              onPress={() => triggerMoveDocumentIntoFolder(document, folder)}>
              <View style={styles.hstack}>
                <Icon style={styles.menuIcon} color={colors.blue} name='folder' />
                <Text style={styles.text}>{folder.nom}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
};

export default PickFolder;
