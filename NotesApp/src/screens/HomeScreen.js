import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity } from 'react-native';
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add Note" onPress={() => navigation.navigate('AddEdit')} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AddEdit', { note: item })}>
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.content}</Text>
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
