import React from 'react';
import CustomModal from '../../UI/CustomModal';
import t from '../../../services/translation';
import ItemModal from '../Components/ItemModal';
import { UseBoolean } from 'react-hanger';
import TextField from '../../UI/TextField';
import { FolderIconInterface } from '../../../types/Folder';
import { useCreateFolder, useFetchFolderIcons } from '../../../hooks/FoldersHooks';
import FolderContext from '../../../context/FolderContext';
import FolderIconPicker from './FolderIconPicker';

const CreateFolderModal: React.FC<{ show: UseBoolean, folderId?: number }> = ({ show, folderId }) => {
  useFetchFolderIcons();
  const { icons } = React.useContext(FolderContext);
  const [selectedIcon, setSelectedIcon] = React.useState<FolderIconInterface>(null);
  const [input, setInput] = React.useState<string>('');
  const { triggerCreateFolder } = useCreateFolder(folderId);

  const createFolder = async () => {
    triggerCreateFolder(input, selectedIcon?.id);
    show.setFalse();
  }

  return (
    <CustomModal
      title={t.t('folder_name')}
      visible={show.value}
      setVisible={show.setValue}
      content={
        <>
          <TextField fieldLabel='name' handleChange={setInput} iconName='tag' okIcon value={input} />
          <FolderIconPicker icons={icons} selectedIcon={selectedIcon} pickIcon={setSelectedIcon} />
          <ItemModal iconName='plus' label='create' onPress={() => createFolder()} disabled={!input} />
        </>
      }
    />
  );
};

export default CreateFolderModal;
