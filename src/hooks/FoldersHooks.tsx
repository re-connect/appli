import * as React from 'react';
import { useBoolean } from 'react-hanger/array';
import { Alert } from 'react-native';
import prompt from 'react-native-prompt-android';
import FolderContext from '../context/FolderContext';
import { makePublicRequest, makeRequest, makeRequestv2 } from '../services/requests';
import t from '../services/translation';
import { useFetchData } from './DataHooks';
import { FolderIconInterface } from '../types/Folder';
import { useArray } from 'react-hanger';
import BeneficiaryContext from '../context/BeneficiaryContext';

export const useFetchFolders = (id?: number) => {
  return useFetchData(FolderContext, !id ? null : `beneficiaries/${id}/folders`);
};

export const useFetchFolderIcons = (): void => {
  const { icons, setIcons } = React.useContext(FolderContext);

  const triggerFetch = React.useCallback(async () => {
    if (icons && icons.length > 0) {
      return;
    }
    try {
      const data = await makePublicRequest('/folder_icons');
      if (data) {
        setIcons(data);
      }
    } catch (error) {
      return;
    }
  }, []);

  React.useEffect(() => {
    triggerFetch();
  }, []);

  return;
};

export const useCreateFolder = (parentFolderId?: number) => {
  const { current } = React.useContext(BeneficiaryContext);
  const [isCreatingFolder, actions] = useBoolean(false);
  const { list, setList } = React.useContext(FolderContext);

  const triggerCreateFolder = React.useCallback(async (name, iconId) => {
    try {
      const beneficiaryId = current?.subject_id;
      actions.setTrue();
      if (beneficiaryId) {
        const params: { nom: string; dossier_parent_id?: number; icon_id: number } = { nom: name, icon_id: iconId };
        if (parentFolderId) {
          params.dossier_parent_id = parentFolderId;
        }
        const createdFolder = await makeRequestv2(`/beneficiaries/${beneficiaryId}/folders`, 'POST', params);
        if (createdFolder) {
          setList([createdFolder, ...list]);
        }
      }
      actions.setFalse();
    } catch (error: any) {
      actions.setFalse();
      Alert.alert(t.t('error_creating_folder'));
    }
  }, [list, setList, actions, parentFolderId]);

  return { triggerCreateFolder, isCreatingFolder };
};
