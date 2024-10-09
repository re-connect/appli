import * as React from 'react';
import CustomModal from '../UI/CustomModal';
import DocumentActionsModalContent from './DocumentActionsModalContent';
import { DocumentInterface } from '../../types/Documents';
import { useTranslation } from 'react-i18next';

interface Props {
  document: DocumentInterface;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const DocumentActionsModal: React.FC<Props> = ({ document, visible, setVisible }) => {
  const { t } = useTranslation();

  return <CustomModal
    visible={visible}
    setVisible={setVisible}
    title={t('actions')}
    content={<DocumentActionsModalContent document={document} close={() => setVisible(false)} />}
  />
}

export default DocumentActionsModal;
