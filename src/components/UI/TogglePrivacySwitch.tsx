import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { usePatchData } from '../../hooks/DataHooks';
import { colors } from '../../style';
import RNSwitch from './RNSwitch';
import Icon from './Icon';

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 20 },
  loader: { paddingHorizontal: 48 },
});

interface Props {
  isPrivate: boolean;
  endpoint: string;
  Context: React.Context<any>;
  itemId: number;
}

const TogglePrivacySwitch: React.FC<Props> = ({ isPrivate, endpoint, Context, itemId }) => {
  const toggle = usePatchData(`${endpoint}/toggle-access`, itemId, Context);

  return (
    <View style={styles.container}>
      <Icon style={{ ...styles.icon, marginRight: 8 }} name='share' color={colors.blue} />
      <RNSwitch value={isPrivate} onPress={() => toggle.patch(true)} />
      <Icon style={{ ...styles.icon, marginLeft: 8 }} name='lock' color={colors.red} />
    </View>
  );
};

export default TogglePrivacySwitch;
