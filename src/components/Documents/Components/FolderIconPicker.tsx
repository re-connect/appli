import React from 'react';
import Text from '../../UI/Text';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FolderIconInterface } from '../../../types/Folder';
import { backendUrl } from '../../../appConstants';
import { colors } from '../../../style';
import Icon from '../../UI/Icon';
import { SvgCssUri } from 'react-native-svg/css';

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
  selectedIconContainer: { backgroundColor: colors.primary, borderColor: colors.white },
  selectedIconText: { color: colors.white },
  icon: { width: 40, height: 40, marginHorizontal: 8 },
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
          <SvgCssUri style={styles.icon} uri={`${backendUrl}/${icon.url}`} />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.iconContainer} onPress={() => pickIcon(null)} >
        <Icon name='xmark' style={styles.clearIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default FolderIconPicker;
