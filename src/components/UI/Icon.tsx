import * as React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet } from 'react-native';
import { colors } from '../../style';
import FaIcon from '@expo/vector-icons/FontAwesome6';
import { FontAwesome6IconProps } from 'react-native-vector-icons/FontAwesome6';

type Props = Omit<FontAwesome6IconProps, 'name'> & {
  style?: StyleProp<any>;
  color?: string;
  size?: number;
  name?: any;
  onPress?: (_event: GestureResponderEvent) => void;
  accessibilityLabel?: string;
};

const styles = StyleSheet.create({
  icon: { fontSize: 15, marginHorizontal: 16 },
});

// Icons are decorative unless they are pressable: then they are exposed as a button
// and need an accessibilityLabel.
const Icon: React.FC<Props> = ({ style, color, name, size, onPress, accessibilityLabel }) =>
  !name ? null : (
  <FaIcon
    style={[styles.icon, style]}
    color={!color ? colors.white : color}
    name={name}
    size={size}
    solid
    onPress={onPress}
    {...(onPress
      ? { accessible: true, accessibilityRole: 'button' as const, accessibilityLabel }
      : { accessible: false, importantForAccessibility: 'no' as const, accessibilityElementsHidden: true })}
  />
);
export default Icon;
