import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'NotesApp.db';
const database_version = '1.0';
const database_displayname = 'SQLite NotesApp Database';
const database_size = 200000;

export const getDBConnection = async () => {
  const db = await SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
  return db;
};

export const createTables = async (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT
    );
  `;
  await db.executeSql(query);
};

export const getNotes = async (db) => {
  const results = await db.executeSql('SELECT * FROM notes');
  return results[0].rows.raw();
};

export const saveNote = async (db, title, content) => {
  const insertQuery = `INSERT INTO notes (title, content) VALUES (?, ?)`;
  await db.executeSql(insertQuery, [title, content]);
};

export const updateNote = async (db, id, title, content) => {
  const updateQuery = `UPDATE notes SET title = ?, content = ? WHERE id = ?`;
  await db.executeSql(updateQuery, [title, content, id]);
};

export const deleteNote = async (db, id) => {
  const deleteQuery = `DELETE FROM notes WHERE id = ?`;
  await db.executeSql(deleteQuery, [id]);
};
