import { NavigationProp, RouteProp } from '@react-navigation/native';

type FolderScreenParams = { folderId: number; beneficiaryId: number };
export type FolderScreenProps = {
  route: RouteProp<{ Folder: FolderScreenParams }, 'Folder'>;
};

type FullScreenImageScreenParams = { id: number };
export type FullScreenImageScreenProps = {
  route: RouteProp<{ Document: FullScreenImageScreenParams }, 'Document'>;
  navigation: NavigationProp<any>;
};

export type DocumentStackParamList = {
  DocumentsList: {};
  Folder: FolderScreenParams;
};
