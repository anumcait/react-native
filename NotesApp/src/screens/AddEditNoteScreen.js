import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getDBConnection, saveNote, updateNote } from '../database/database';

const AddEditNoteScreen = ({ navigation, route }) => {
  const existingNote = route.params?.note;
  const [title, setTitle] = useState(existingNote ? existingNote.title : '');
  const [content, setContent] = useState(existingNote ? existingNote.content : '');

  const handleSave = async () => {
    const db = await getDBConnection();
    if (existingNote) {
      await updateNote(db, existingNote.id, title, content);
    } else {
      await saveNote(db, title, content);
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
        style={{ marginTop: 10 }}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AddEditNoteScreen;
