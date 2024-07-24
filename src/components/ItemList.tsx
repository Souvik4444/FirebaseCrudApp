import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id} 
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemtext}>Name: {item.name}</Text>
          <Text style={styles.itemtext}>Email: {item.email}</Text>
          <Text style={styles.itemtext}>Phone: {item.phone}</Text>
          <Text style={styles.itemtext}>Gender: {item.gender}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => onEdit(item)} style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item.id)} style={[styles.button, {backgroundColor:'red'}]}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemtext:{
    color:'black',
    marginBottom:'.5%',
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:'5%'
  },
  button: {
    padding: 8,
    backgroundColor: 'green',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight:'700'
  },
});

export default ItemList;
