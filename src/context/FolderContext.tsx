import * as React from 'react';
import { FolderIconInterface, FolderInterface } from '../types/Folder';

export interface FolderContextInterface {
  list: FolderInterface[];
  icons: FolderIconInterface[];
  setIcons: (list: FolderIconInterface[]) => void;
  setList: (list: FolderInterface[]) => void;
}

const defaultState: FolderContextInterface = {
  list: [],
  icons: [],
  setIcons: () => null,
  setList: () => null,
};

const FolderContext = React.createContext(defaultState);

export default FolderContext;
