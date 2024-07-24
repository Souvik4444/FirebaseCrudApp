import React, { useState, useEffect } from 'react';
import { View, Alert, SafeAreaView, ActivityIndicator, StyleSheet, Keyboard } from 'react-native';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, firestore, db, } from './firebaseConfig';
import ItemList from './components/ItemList';
import Form from './components/Form';
import { Item } from './types';
import { showNotification } from './notifications';
import { Firestore, setDoc } from 'firebase/firestore';

const Crud: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState<Item>({
    id: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, 'items'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Item));
      setItems(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch items.');
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      const newItemRef = doc(collection(firestore, 'items'));
      const newItem = {
        id: newItemRef.id,
        name: currentItem.name,
        email: currentItem.email,
        phone: currentItem.phone,
        gender: currentItem.gender,
      };
      await setDoc(newItemRef, newItem);
      setCurrentItem({ id: '', name: '', email: '', phone: '', gender: '' });
      fetchItems();
      showNotification('Success', 'Item added.');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item.');
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    Keyboard.dismiss();
    try {
      if (!currentItem.id) {
        throw new Error('Item ID is missing');
      }
      const itemRef = doc(firestore, 'items', currentItem.id);
      const updatedItem = {
        name: currentItem.name,
        email: currentItem.email,
        phone: currentItem.phone,
        gender: currentItem.gender,
      };
      console.log('Updating item:', updatedItem);
      await updateDoc(itemRef, updatedItem);
      setCurrentItem({ id: '', name: '', email: '', phone: '', gender: '' });
      setIsEditing(false);
      fetchItems();
      showNotification('Success', 'Item updated.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update item.');
      console.error('Error updating item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const itemRef = doc(firestore, 'items', id);
      await deleteDoc(itemRef);
      fetchItems();
      showNotification('Success', 'Item deleted.');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item.');
      console.error('Error deleting item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16,marginTop:'5%' }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      <Form
        item={currentItem}
        onChange={(key, value) => setCurrentItem({ ...currentItem, [key]: value })}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setCurrentItem({ id: '', name: '', email: '', phone: '', gender: '' });
          Keyboard.dismiss();
          setIsEditing(false);
        }}
      />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -25,
  },
});

export default Crud;

