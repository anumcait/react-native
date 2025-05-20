import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Alert, Button, TouchableOpacity } from 'react-native';
import { getDBConnection, createTables, getNotes, deleteNote } from '../database/database';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  const loadData = async () => {
    const db = await getDBConnection();
    await createTables(db);
    const data = await getNotes(db);
   
    setNotes(data);
  };

  const handleDelete = async (id) => {
    const db = await getDBConnection();
    await deleteNote(db, id);
    loadData();
  };

  const confirmDelete = (id) => {
  Alert.alert(
    "Delete Note",
    "Are you sure you want to delete this note?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => handleDelete(id) }
    ]
  );
};
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    loadData();
  });

  return unsubscribe;
}, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Note" onPress={() => navigation.navigate('AddEdit')} />
      <FlatList
  data={notes}
  keyExtractor={(item) => item.id?.toString()}
  renderItem={({ item }) => (
    <View style={{
      padding: 15,
      marginVertical: 8,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc'
    }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.title}</Text>
      <Text style={{ marginTop: 5, fontSize: 14 }}>{item.content}</Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 5,
            marginRight: 10
          }}
          onPress={() => navigation.navigate('AddEdit', { note: item })}
        >
          <Text style={{ color: '#fff' }}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#dc3545',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 5
          }}
          onPress={() => confirmDelete(item.id)}
        >
          <Text style={{ color: '#fff' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
  ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No notes found</Text>}
/>
    </View>
  );
};

export default HomeScreen;
