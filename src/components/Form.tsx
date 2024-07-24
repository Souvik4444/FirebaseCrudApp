import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Item } from '../types';

interface FormProps {
  item: Item;
  onChange: (key: keyof Item, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const Form: React.FC<FormProps> = ({ item, onChange, onSubmit, onCancel }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={'grey'}
        value={item.name}
        onChangeText={(text) => onChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'grey'}
        value={item.email}
        onChangeText={(text) => onChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor={'grey'}
        value={item.phone}
        onChangeText={(text) => onChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        placeholderTextColor={'grey'}
        value={item.gender}
        onChangeText={(text) => onChange('gender', text)}
      />
      <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    color:'black'
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'700'
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'700'
  },
});

export default Form;
