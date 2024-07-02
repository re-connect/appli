import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../style';

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 20, right: 20, zIndex: 1 },
});

const ChatButton = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <IconButton
        iconName='comment-alt'
        onPress={() => navigation.navigate('Chat')}
        size={60}
        backgroundColor={colors.chat}
      />
    </View>
  );
};


export default ChatButton;
