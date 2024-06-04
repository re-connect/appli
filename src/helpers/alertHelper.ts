import { Alert } from 'react-native';
import t from '../services/translation';

let alertOpen = false;

export function alert(text: string) {
    if (alertOpen) return;

    alertOpen = true; 
    Alert.alert(t.t(text), null, [], { onDismiss: () => alertOpen = false });
}
