import * as React from 'react';
import { Linking } from 'react-native';
import { useBoolean } from 'react-hanger/array';
import DocumentContext from '../../context/DocumentContext';
import FolderContext from '../../context/FolderContext';
import { useDeleteData } from '../../hooks/DataHooks';
import { useMoveDocumentOutOfFolder, useRenameItem, useShowDocument } from '../../hooks/DocumentsHooks';
import { DocumentInterface } from '../../types/Documents';
import ActionsModalContent from './Components/ActionsModalContent';
import PickFolder from './Components/PickFolder';
import Rename from './Components/Rename';
import SendByEmailForm from './SendByEmailForm';
import { FolderIconInterface } from '../../types/Folder';

interface Props {
  document: DocumentInterface;
  close: () => void;
}

const DocumentActionsModalContent: React.FC<Props> = ({ document, close }) => {
  const { documentUrl } = useShowDocument(document.id);
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

  const actions = {
    delete: () => {deleteItem(true); cloesModal();},
    view: () => {},
    moveOut: triggerMoveDocumentOutOfFolder,
    pickFolder: pickingFolderActions.setTrue,
    showRenameForm: showFormActions.setTrue,
    showSendEmailForm: showSendEmailFormActions.setTrue,
  };

  const renameItem = async (name: string, selectedIcon?: FolderIconInterface) => {
    await triggerRename(name, selectedIcon);
    cloesModal();
  };

  if (showSendEmailForm) {
    return <SendByEmailForm document={document} close={cloesModal} onSubmit={showSendEmailFormActions.setFalse} />;
  }

  if (!document.is_folder) {
    actions.view = () => Linking.openURL(documentUrl).then(() => cloesModal());
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
