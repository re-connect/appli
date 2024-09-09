import { AnyDataInterface } from './Data';
import { DocumentInterface } from './Documents';

export interface FolderInterface extends AnyDataInterface {
  nom: string;
  documents?: DocumentInterface[];
  dossier_image?: string;
  is_folder?: boolean;
  beneficiaire?: {
    id?: number;
  };
  beneficiaire_id?: number;
  dossier_parent?: {
    id?: number;
  };
  sous_dossiers?: FolderInterface[];
}

export interface FolderCardInterface {
  item: FolderInterface;
}

export interface FolderIconInterface {
  id: number;
  name: string;
  url: string;
  public_file_path: string;
}
