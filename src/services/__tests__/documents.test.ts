import storage from '@react-native-async-storage/async-storage';
import { documentsAndFoldersList } from '../../fixtures/documentsFixtures';
import { addDocumentsToFormData, findFolderDocuments, uploadDocuments } from '../documents';
import * as errors from '../errors';

const mockHandleError = jest.spyOn(errors, 'handleError');

mockHandleError.mockImplementation(() => {});

describe('findFolderDocuments', () => {
  it('Should return all documents in the folder', () => {
    const initialList = [...documentsAndFoldersList];
    const folderDocuments = findFolderDocuments(initialList, 4850);
    expect(folderDocuments.length).toBe(3);
  });
  it('Should return no document if id is invalid', () => {
    const initialList = [...documentsAndFoldersList];
    const folderDocuments = findFolderDocuments(initialList, 1111);
    expect(folderDocuments.length).toBe(0);
  });
});

describe('addDocumentsToFormData', () => {
  const images = [{ path: 'file://here.jpg' }, { path: 'file://here2.jpg', filename: 'fileName.jpg' }];
  const partsOf = (fd: FormData) => (fd as unknown as { _parts: any[][] })._parts;
  it('should create a formData object', () => {
    const formData = addDocumentsToFormData(new FormData(), images);
    const parts = partsOf(formData);
    expect(parts).toBeDefined();
    expect(parts[0]).toBeDefined();
    expect(parts[0][1].uri).toBe('here.jpg');
  });
  it('should use the filename filename if defined', () => {
    const formData = addDocumentsToFormData(new FormData(), images);
    const parts = partsOf(formData);
    expect(parts).toBeDefined();
    expect(parts[1]).toBeDefined();
    expect(parts[1][1].name).toBe('fileName.jpg');
    expect(parts[1][1].uri).toBe('here2.jpg');
  });
  it('should not remove file:// part on Android', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }));
    const formData = addDocumentsToFormData(new FormData(), images);
    const parts = partsOf(formData);
    expect(parts).toBeDefined();
    expect(parts[0]).toBeDefined();
    expect(parts[0][1].uri).toBe('file://here.jpg');
  });
});

describe('uploadDocument', () => {
  const images = [{ path: 'file://here.jpg' }, { path: 'file://here2.jpg', filename: 'fileName.jpg' }];
  beforeAll(async () => {
    await storage.setItem('accessToken', 'ThisIsMyTestAccessToken');
  });
  beforeEach(() => {
    (global.fetch as unknown as jest.Mock).mockClear();
  });
  it('should throw', async () => {
    (global.fetch as unknown as jest.Mock).mockRejectedValue('Error');
    await uploadDocuments(images, 12);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockHandleError).toHaveBeenCalled();
  });
});
