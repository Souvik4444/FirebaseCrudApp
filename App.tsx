import { StatusBar } from 'expo-status-bar';
import { StyleSheet  } from 'react-native';
import Crud from './src/Crud';

export default function App() {
  return (
    <Crud/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
