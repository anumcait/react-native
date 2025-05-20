import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getDBConnection, saveNote, updateNote } from '../database/database';

const AddEditNoteScreen = ({ navigation, route }) => {
  // Get the note from route params (if editing)
  const existingNote = route.params?.note;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
    }
  }, [existingNote]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title.');
      return;
    }

    try {
      const db = await getDBConnection();

      if (existingNote) {
        // Update existing note
        await updateNote(db, existingNote.id, title, content);
        console.log('Note updated');
      } else {
        // Save new note
        await saveNote(db, title, content);
        console.log('Note saved');
      }

      navigation.goBack(); // Navigate back to the list
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'There was a problem saving the note.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          fontSize: 16,
          marginBottom: 10
        }}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          fontSize: 16,
          textAlignVertical: 'top'
        }}
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Save Note" onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddEditNoteScreen;
