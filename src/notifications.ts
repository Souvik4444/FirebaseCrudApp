import {Alert} from 'react-native';

export const showNotification = (title: string, message: string) => {
  Alert.alert(title, message);
};
