import * as React from 'react';
import { Linking } from 'react-native';
import { useBoolean } from 'react-hanger/array';
import DocumentContext from '../../context/DocumentContext';
import FolderContext from '../../context/FolderContext';
import { useDeleteData } from '../../hooks/DataHooks';
import { useMoveDocumentOutOfFolder, useRenameItem, useShowDocument } from '../../hooks/DocumentsHooks';
import { DocumentInterface } from '../../types/Documents';
import ActionsModalContent, { ActionItemProps } from './Components/ActionsModalContent';
import PickFolder from './Components/PickFolder';
import Rename from './Components/Rename';
import SendByEmailForm from './SendByEmailForm';
import { FolderIconInterface } from '../../types/Folder';
import UserContext from '../../context/UserContext';
import { isPro } from '../../helpers/userHelpers';
import { colors } from '../../style';

interface Props {
  document: DocumentInterface;
  close: () => void;
}

const DocumentActionsModalContent: React.FC<Props> = ({ document, close }) => {
  const { documentUrl } = useShowDocument(document.id);
  const { user } = React.useContext(UserContext);
  const [pickingFolder, pickingFolderActions] = useBoolean(false);
  const [showSendEmailForm, showSendEmailFormActions] = useBoolean(false);
  const { triggerRename, showForm, showFormActions } = useRenameItem(document);
  const itemEndpoint = document.is_folder ? `folders/${document.id}` : `documents/${document.id}`;
  const itemContext = document.is_folder ? FolderContext : DocumentContext;
  const { deleteItem } = useDeleteData(itemContext, itemEndpoint, document.id);
  const { triggerMoveDocumentOutOfFolder } = useMoveDocumentOutOfFolder(document);

  const cloesModal = () => {
    if (close) {
      close();
    }
  }

  const renameItem = async (name: string, selectedIcon?: FolderIconInterface) => {
    await triggerRename(name, selectedIcon);
    cloesModal();
  };

  const actions: ActionItemProps[] = [
    { action: showSendEmailFormActions.setTrue, label: 'send_by_email', icon: 'paper-plane', condition: !document.is_folder },
    { action: pickingFolderActions.setTrue, label: 'move_to_folder', icon: 'folder', condition: !document.is_folder },
    { action: triggerMoveDocumentOutOfFolder, label: 'move_out_of_folder', icon: 'folder', condition: !!document.folder_id },
    { action: showFormActions.setTrue, color: colors.green, label: document.is_folder ? 'modify' : 'rename', icon: 'pen' },
  ];

  if (!document.is_folder) {
    actions.push({
      action: () => Linking.openURL(documentUrl).then(() => cloesModal()),
      color: colors.yellow,
      label: 'Download',
      icon: 'download'
    });
  }

  if (!isPro(user)) {
    actions.push({ action: () => {deleteItem(true); cloesModal()}, color: colors.red, label: 'delete', icon: 'trash' });
  }

  if (showSendEmailForm) {
    return <SendByEmailForm document={document} close={cloesModal} onSubmit={showSendEmailFormActions.setFalse} />;
  }

  if (showForm) {
    return <Rename close={showFormActions.setFalse} closeModal={cloesModal} onSubmit={renameItem} document={document} />;
  }

  if (pickingFolder) {
    return <PickFolder document={document} onPick={pickingFolderActions.setFalse} close={cloesModal} />;
  }

  return <ActionsModalContent document={document} actions={actions} />;
};

export default DocumentActionsModalContent;
