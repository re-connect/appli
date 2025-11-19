import * as React from 'react';
import { ActivityIndicator, StyleSheet, TouchableHighlight, View } from 'react-native';
import { colors } from '../../style';
import Text from '../UI/Text';
import Thumbnail from './Thumbnail';
import { useBoolean } from 'react-hanger/array';
import { AnyDataInterface } from '../../types/Data';
import Icon from './Icon';
import { backendUrl } from '../../appConstants';
import { SvgCssUri } from 'react-native-svg/css';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderLeftColor: colors.white,
    borderRightColor: colors.white,
    borderTopColor: colors.white,
    borderBottomColor: colors.white,
    minHeight: 80,
    marginLeft: 0,
    marginVertical: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    borderLeftWidth: 4,
  },
  content: {
    display: 'flex',
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  icon: {
    fontSize: 40,
    marginHorizontal: 16,
  },
  icon_image: { width: 70, height: 70, marginRight: 8 },
});

interface Props {
  onPress: (item: AnyDataInterface) => void;
  title: string;
  item: AnyDataInterface;
  iconName?: string;
  hasThumbnail?: boolean;
  disabled?: boolean;
  isPrivate: boolean;
  RightComponent: React.FC | null;
  Subtitle: React.FC | null;
}

const CardIcon: React.FC<{ iconName: string }> = ({ iconName }) => {
  return <Icon style={styles.icon} color={colors.darkGray} name={iconName} />;
};

const Card: React.FC<Props> = ({
  item,
  disabled,
  onPress,
  hasThumbnail,
  title,
  iconName,
  isPrivate,
  RightComponent,
  Subtitle,
}) => {
  const [isLoading, isLoadingActions] = useBoolean(false);
  const onItemPress = () => {
    isLoadingActions.setTrue();
    onPress(item);
    setTimeout(() => {
      isLoadingActions.setFalse();
    }, 1000);
  };

  if (disabled) {
    return null;
  }

  const IconComponent = hasThumbnail ?  <Thumbnail documentId={item.id} /> : <CardIcon iconName={iconName} />

  return (
    <TouchableHighlight
      disabled={isLoading}
      onPress={() => onItemPress()}
      underlayColor={colors.secondary}
      style={{ ...styles.container, borderLeftColor: isPrivate ? colors.red : colors.blue }}>
      {isLoading ? (
        <ActivityIndicator size='large' color={colors.black} />
      ) : (
        <View style={styles.card}>
          {
            item?.icon_file_path
            ? <SvgCssUri
              style={styles.icon_image}
              uri={`${backendUrl}/${item?.icon_file_path}`}
            />
            : IconComponent
          }
          <View style={styles.content}>
            <Text>{title}</Text>
            {Subtitle === null ? null : <Subtitle />}
          </View>
          {RightComponent === null ? null : <RightComponent />}
        </View>
      )}
    </TouchableHighlight>
  );
};

export default Card;
