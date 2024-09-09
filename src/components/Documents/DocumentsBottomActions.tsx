import React, { useState } from 'react';
import { useBoolean } from 'react-hanger';
import { StyleSheet, View } from 'react-native';
import BeneficiaryContext from '../../context/BeneficiaryContext';
import { useScanDocument, useUploadDocument } from '../../hooks/DocumentsHooks';
import { ScannedGeniusDocumentInterface } from '../../types/Documents';
import IconButton from '../UI/IconButton';
import DocumentScanModal from './DocumentScanModal';
import DocumentUploadModal from './DocumentUploadModal';
import CreateFolderModal from './Components/CreateFolderModal';

const styles = StyleSheet.create({
  leftButton: { position: 'absolute', right: 70, bottom: 5, zIndex: 1 },
  rightButton: { position: 'absolute', right: 5, bottom: 5, zIndex: 1 },
});

interface Props {
  folderId?: number;
}

const DocumentsBottomActions: React.FC<Props> = ({ folderId }) => {
  const { current } = React.useContext(BeneficiaryContext);
  const { triggerDocumentUpload } = useUploadDocument(current?.subject_id, folderId);
  const { triggerScanDocument } = useScanDocument();
  const showDocumentModal = useBoolean(false);
  const showFolderModal = useBoolean(false);
  const showScanModal = useBoolean(false);
  const [imagesScanned, setImagesScanned] = useState<ScannedGeniusDocumentInterface>();

  const handleScanDocument = async () => {
    showDocumentModal.setFalse();
    const scannedPictures = await triggerScanDocument();
    setImagesScanned(scannedPictures);
    const images: { path: any }[] = [];

    if (scannedPictures.scans.length > 1) {
      showScanModal.setTrue();
    } else {
      scannedPictures.scans.map((enhancedImage: any) => images.push({ path: enhancedImage.enhancedUrl }));
      triggerDocumentUpload(images);
    }
  };

  return (
    <>
      <DocumentUploadModal
        visible={showDocumentModal.value}
        setVisible={showDocumentModal.setValue}
        triggerDocumentUpload={triggerDocumentUpload}
        handleScanDocument={handleScanDocument}
      />
      <CreateFolderModal show={showFolderModal} folderId={folderId} />
      {imagesScanned && (
        <DocumentScanModal
          triggerDocumentUpload={triggerDocumentUpload}
          geniusScannedDocument={imagesScanned}
          visible={showScanModal.value}
          setVisible={showScanModal.setValue}
        />
      )}
      <View style={styles.leftButton}>
        <IconButton
          size={40}
          iconName="folder-open"
          onPress={() => showFolderModal.setTrue()}
          addPlusIcon
        />
      </View>
      <View style={styles.rightButton}>
        <IconButton
          size={60}
          iconName='file'
          onPress={() => showDocumentModal.setTrue()}
          addPlusIcon
        />
      </View>
    </>
  );
};

export default DocumentsBottomActions;
