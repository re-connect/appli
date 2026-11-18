import * as React from 'react';
import { RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { colors } from '../../style';
import { AnyDataInterface, ListContextInterface } from '../../types/Data';
import Card from './Card';
import ListHiddenItem, { useListItemActions } from './ListHiddenItem';
import SearchBar from './SearchBar';
import Separator from './Separator';
import { UseBooleanActions } from 'react-hanger/array';
import UserContext from '../../context/UserContext';
import { isPro } from '../../helpers/userHelpers';
import FolderContext from '../../context/FolderContext';
import { hasPrivateParent } from '../../helpers/documentsHelper';
import { AccessibilityActionEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CardProps } from './Card';

type DataCardInterface = { item: AnyDataInterface };

interface ListRowProps extends Omit<CardProps, 'accessibilityActions' | 'onAccessibilityAction'> {
  getLeftActionEndpoint: (item?: AnyDataInterface) => string;
  getRightActionEndpoint: (item?: AnyDataInterface) => string;
  getDataContext: (item?: AnyDataInterface) => React.Context<ListContextInterface<any>>;
  canToggle: boolean;
  canDelete: boolean;
}

// Swipe actions are out of reach of screen reader users: offer them as actions of the row.
const ListRow: React.FC<ListRowProps> = ({ getLeftActionEndpoint, getRightActionEndpoint, getDataContext, canToggle, canDelete, ...cardProps }) => {
  const { t } = useTranslation();
  const { toggleItemText, patch, deleteItem } = useListItemActions({
    datum: { item: cardProps.item },
    getLeftActionEndpoint,
    getRightActionEndpoint,
    getDataContext,
  });
  const actions = [
    ...(canToggle ? [{ name: 'toggle_access', label: t(toggleItemText) }] : []),
    ...(canDelete ? [{ name: 'delete', label: t('delete') }] : []),
  ];
  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    if (event.nativeEvent.actionName === 'toggle_access') patch();
    if (event.nativeEvent.actionName === 'delete') deleteItem();
  };

  return <Card {...cardProps} accessibilityActions={actions} onAccessibilityAction={onAccessibilityAction} />;
};


interface Props {
  currentFolderId?: number;
  data: AnyDataInterface[];
  getDataContext: (item?: AnyDataInterface) => React.Context<ListContextInterface<any>>;
  getItemRightComponent?: (item: AnyDataInterface) => React.FC;
  getName: (item: AnyDataInterface) => string;
  getSubtitle?: (item: AnyDataInterface) => React.FC;
  hasThumbnail?: boolean;
  isFetchingData: boolean;
  itemIconName?: string;
  getLeftActionEndpoint: (item?: AnyDataInterface) => string;
  onItemPress: (item: AnyDataInterface) => void;
  isModalOpen?: boolean;
  openModalActions?: UseBooleanActions;
  getRightActionEndpoint: (item?: AnyDataInterface) => string;
  triggerFetchData: () => Promise<void>;
  currentDocument?: AnyDataInterface | null;
}

const List: React.FC<Props> = ({
  currentFolderId,
  data,
  getDataContext,
  getItemRightComponent,
  getName,
  getSubtitle,
  hasThumbnail,
  isFetchingData,
  itemIconName,
  getLeftActionEndpoint,
  onItemPress,
  getRightActionEndpoint,
  triggerFetchData,
}) => {
  const { user } = React.useContext(UserContext);
  const [search, setSearch] = React.useState<string>('');
  const { list: folders } = React.useContext(FolderContext);
  const filteredData = data.filter((datum: AnyDataInterface) =>
    JSON.stringify(datum).toLowerCase().includes(search.toLowerCase()),
  );

  const firstDatum = data.length > 0 ? data[0] : null;
  const isDocumentsList = firstDatum && ['documents', 'folders'].includes(getLeftActionEndpoint(firstDatum));
  
  const disableLeftSwipe = isDocumentsList && isPro(user);
  const disableRightSwipe = isDocumentsList && (hasPrivateParent(folders, currentFolderId));

  return (
    <>
      <SearchBar onChange={setSearch} />
      <SwipeListView
        data={filteredData}
        closeOnScroll
        closeOnRowPress
        keyExtractor={(item: AnyDataInterface) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isFetchingData} onRefresh={triggerFetchData} tintColor={colors.white} enabled />
        }
        renderItem={({ item }: DataCardInterface) => (
          <ListRow
            getLeftActionEndpoint={getLeftActionEndpoint}
            getRightActionEndpoint={getRightActionEndpoint}
            getDataContext={getDataContext}
            canToggle={!disableRightSwipe}
            canDelete={!disableLeftSwipe}
            item={item}
            onPress={() => onItemPress(item)}
            isPrivate={!!item.b_prive}
            title={getName(item)}
            iconName={itemIconName}
            hasThumbnail={hasThumbnail}
            RightComponent={!getItemRightComponent ? null : getItemRightComponent(item)}
            Subtitle={!getSubtitle ? null : getSubtitle(item)}
          />
        )}
        renderHiddenItem={(datum: DataCardInterface) => (
          <ListHiddenItem
            datum={datum}
            getLeftActionEndpoint={getLeftActionEndpoint}
            getRightActionEndpoint={getRightActionEndpoint}
            getDataContext={getDataContext}
          />
        )}
        disableRightSwipe={disableRightSwipe}
        disableLeftSwipe={disableLeftSwipe}
        leftOpenValue={75}
        rightOpenValue={-75}
        ListFooterComponent={() => <Separator height={6} />}
      />
    </>
  );
};

export default List;
