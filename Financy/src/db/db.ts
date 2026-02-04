import * as SQLite from 'expo-sqlite';

export const open_db = async () => {
  return await SQLite.openDatabaseAsync('financy.db');
};
