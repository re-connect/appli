import * as React from 'react';
import { Dimensions, Keyboard, Modal, StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../style';
import Icon from './Icon';

const CustomModal: React.FC<{
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title: string;
  content: React.ReactNode;
}> = ({ title, content, visible, setVisible }) => {
  const closeModal = () => {
    if (setVisible) {
      setVisible(false);
    }
  }

  return (
    <>
      {visible && <TouchableOpacity style={styles.opacityWrapper} accessible={false} importantForAccessibility='no' />}
      <Modal visible={visible} onRequestClose={closeModal} animationType='slide' transparent>
        <ModalContainer close={closeModal} header={<ModalHeaderTitle title={title} closeModal={closeModal} />}>{content}</ModalContainer>
      </Modal>
    </>
  );
};

export interface TitleModalProps {
  title: string;
  closeModal: () => void;
}

type ModalContainerProps = {
  header?: React.ReactNode;
  children?: React.ReactNode;
  close: () => void;
};

export const ModalContainer: React.FunctionComponent<ModalContainerProps> = ({ header, children, close }) => {
  const marginInPx = 10;
  const [keyboardVisible, setKeyboardVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener( 'keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener( 'keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    // Both touchables only handle "tap outside to close": they must not group the modal
    // content into a single element for screen readers.
    <TouchableOpacity style={{ flex: 1 }} onPress={() => close()} activeOpacity={1} accessible={false} importantForAccessibility='no'>
      <View style={[styles.centeredView]}>
        <TouchableOpacity
          style={{...styles.modalView, height: keyboardVisible ? '95%': 'auto'}}
          onPress={() => {}}
          activeOpacity={1}
          accessible={false}
          importantForAccessibility='no'
          accessibilityViewIsModal>
          {header}
          <ScrollView
            style={{
              paddingLeft: marginInPx * 2,
              paddingRight: marginInPx * 2,
              paddingBottom: marginInPx * 4,
              width: '100%',
            }}>
            {children}
          </ScrollView>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export const ModalHeaderTitle: React.FunctionComponent<TitleModalProps> = ({ title, closeModal }) => {
  const { t } = useTranslation();
  const userMarginInPx = 10;
  return (
    <>
      <View
        style={[
          styles.mainHeaderWrapper,
          {
            marginTop: userMarginInPx * 2,
            marginBottom: userMarginInPx * 2,
            paddingBottom: userMarginInPx * 2,
          },
        ]}>
        <Text style={styles.mainTitle} accessibilityRole='header'>{title}</Text>
      </View>
      <Icon
        name='xmark'
        color={colors.darkGrayTransparent}
        style={styles.closeButton}
        onPress={closeModal}
        accessibilityLabel={t('a11y_close')}
      />
    </>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  opacityWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: -100,
    left: -8,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 100,
  },
  closeButton: {
    position: 'absolute',
    fontSize: 32,
    right: 0,
    top: 2,
    padding: 10,
  },
  modalView: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: '95%',
  },
  mainTitle: {
    maxWidth: '45%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
  },
  mainHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomColor: '#ECECEC',
    borderBottomWidth: 2,
  },
  titleButtonStyle: {
    textDecorationLine: 'none',
  },
  buttonContainerStyle: {
    width: '33%',
  },
});
