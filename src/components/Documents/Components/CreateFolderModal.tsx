import React, { AriaAttributes } from 'react';
import CustomModal from '../../UI/CustomModal';
import t from '../../../services/translation';
import ItemModal from '../Components/ItemModal';
import { UseBoolean, useInput } from 'react-hanger';
import TextField from '../../UI/TextField';
import Text from '../../UI/Text';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FolderIconInterface } from '../../../types/Folder';
import { useCreateFolder, useFetchFolderIcons } from '../../../hooks/FoldersHooks';
import { backendUrl } from '../../../appConstants';
import FolderContext from '../../../context/FolderContext';
import { colors } from '../../../style';
import Icon from '../../UI/Icon';

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
    padding: 2,
  },
  selectedIconContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.white,
  },
  selectedIconText: { color: colors.white },
  icon: { width: 50, height: 50 },
  clearIcon: { fontSize: 25, color: colors.black },
});


const FolderIconPicker: React.FC<{ icons: Array<FolderIconInterface>, selectedIcon: FolderIconInterface, pickIcon: (icon?: FolderIconInterface) => void }> = ({ icons, selectedIcon, pickIcon }) => {
  if (icons.length === 0) return null;
  
  return (
    <View style={styles.iconsContainer}>
      {icons.map((icon: FolderIconInterface) => 
        <TouchableOpacity
        style={[styles.iconContainer, selectedIcon === icon && styles.selectedIconContainer]}
        key={icon.name}
        onPress={() => pickIcon(icon === selectedIcon ? null : icon)}
        >
          <Text style={[selectedIcon === icon && styles.selectedIconText]}>{icon.name}</Text>
          <Image source={{ uri: `${backendUrl}/${icon.url}` }} style={styles.icon}/>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.iconContainer} onPress={() => pickIcon(null)} >
        <Icon name='xmark' style={styles.clearIcon} />
      </TouchableOpacity>
    </View>
  );
};

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
          <TextField
            fieldLabel='name'
            handleChange={setInput}
            iconName='tag'
            okIcon
            value={input}
          />
          <FolderIconPicker icons={icons} selectedIcon={selectedIcon} pickIcon={setSelectedIcon} />
          <ItemModal iconName='plus' label='create' onPress={() => createFolder()} />
        </>
      }
    />
  );
};

export default CreateFolderModal;
