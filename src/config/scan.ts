import { ImageLibraryOptions, ImagePickerResponse } from "react-native-image-picker";

export const imageLibraryOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    maxWidth: 2000,
    maxHeight: 2000,
    quality: 1,
};

const scanDefaultConfig = {
    source: 'image' as const,
    multiPage: false,
    defaultFilter: 'none',
};

export const getScanConfig = (res: ImagePickerResponse) => ({
    ...scanDefaultConfig,
    sourceImageUrl: res.assets && res.assets[0].uri,
});
