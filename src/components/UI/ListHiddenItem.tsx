import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import UserContext from '../../context/UserContext';
import { useDeleteData, usePatchData } from '../../hooks/DataHooks';
import { colors } from '../../style';
import { AnyDataInterface, ListContextInterface } from '../../types/Data';
import HiddenItemButton from './HiddenItemButton';
import { isPro } from '../../helpers/userHelpers';
import { hasPrivateParent } from '../../helpers/documentsHelper';
import FolderContext from '../../context/FolderContext';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

interface Props {
  datum: { item: AnyDataInterface };
  getLeftActionEndpoint: (item?: AnyDataInterface) => string;
  getRightActionEndpoint: (item?: AnyDataInterface) => string;
  getDataContext: (item?: AnyDataInterface) => React.Context<ListContextInterface<AnyDataInterface>>;
}

const ListHiddenItem: React.FC<Props> = ({ datum, getLeftActionEndpoint, getRightActionEndpoint, getDataContext }) => {
  const { user } = React.useContext(UserContext);
  const { list: folders } = React.useContext(FolderContext);
  const { item } = datum;
  const userLeftActionEndpoint = `${getLeftActionEndpoint(item)}/${item.id}/toggle-access`;
  const { patch, isPatching } = usePatchData(userLeftActionEndpoint, item.id, getDataContext(item));
  const { deleteItem, isDeleting } = useDeleteData(
    getDataContext(item),
    `${getRightActionEndpoint(item)}/${item.id}`,
    item.id,
  );
  const toggleItemText = isPro(user) ? 'make_private' : `make_${!item.b_prive ? 'private' : 'shared'}`;
  const toggleItemColor = !item.b_prive ? colors.red : colors.blue;

  const hideLeftAction =
    ['documents', 'folders'].includes(getLeftActionEndpoint(item))
    && (hasPrivateParent(folders, item.folder_id) || hasPrivateParent(folders, item?.dossier_parent?.id));
  ;

  return (
    <TouchableOpacity style={styles.container} disabled>
      { hideLeftAction ? <View/> :
        <HiddenItemButton isLoading={isPatching} onPress={() => patch()} text={toggleItemText} color={toggleItemColor} />
      }
      <HiddenItemButton isLoading={isDeleting} onPress={() => deleteItem()} iconName="trash" />
    </TouchableOpacity>
  );
};

export default ListHiddenItem;
