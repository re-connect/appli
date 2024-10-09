import * as Formik from 'formik';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import renameShape from '../../../helpers/forms/renameShape';
import { colors } from '../../../style';
import { DocumentInterface } from '../../../types/Documents';
import Text from '../../UI/Text';
import TextField from '../../UI/TextField';
import Icon from '../../UI/Icon';
import FolderIconPicker from './FolderIconPicker';
import FolderContext from '../../../context/FolderContext';
import { FolderIconInterface } from '../../../types/Folder';
import ItemModal from './ItemModal';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '95%',
    zIndex: 50,
  },
  content: {
    backgroundColor: colors.white,
    alignSelf: 'stretch',
    padding: 32,
  },
  menuIcon: { fontSize: 20 },
  menuIconContainer: {
    marginRight: 8,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: '2.5%',
  },
});

interface Props {
  document: DocumentInterface;
  closeModal: () => void;
  close: () => void;
  onSubmit: (name: string, selectedIcon?: FolderIconInterface) => void;
}

const Rename: React.FC<Props> = ({ document, close, closeModal, onSubmit }) => {
  const [selectedIcon, setSelectedIcon] = React.useState<FolderIconInterface>(document?.icon);
  const { icons } = React.useContext(FolderContext);

  return (
      <Formik.Formik
        onSubmit={(values: Record<'name', string>) => {
          onSubmit(values.name, selectedIcon);
          close();
        }}
        initialValues={{ name: document.nom.split('.')[0] }}
        validationSchema={renameShape}>
        {({ handleBlur, handleChange, handleSubmit, values, errors, touched }: Formik.FormikProps<Record<'name', string>>) => {
          return (
            <View style={styles.wrapper}>
              <TextField
                fieldLabel='new_name'
                handleChange={handleChange('name')}
                handleBlur={handleBlur('name')}
                iconName='user-large'
                iconSyle={{ color: colors.darkGray }}
                style={{ color: colors.darkGray }}
                touched={touched.name}
                error={errors.name}
                value={values.name}
              />
              {!document.is_folder ? null : <FolderIconPicker icons={icons} selectedIcon={selectedIcon} pickIcon={setSelectedIcon} />}
              <ItemModal iconName='save' label='validate' onPress={() => handleSubmit()} />
            </View>
          );
        }}
      </Formik.Formik>
  );
}

export default Rename;
