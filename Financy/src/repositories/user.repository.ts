import { open_db } from '../db/db';
import { CreateUserDTO } from '../types/dto';

export const createUser = async (data: CreateUserDTO) => {
  const db = await open_db();
  await db.runAsync(
    `INSERT INTO user (status, created_at) VALUES (?, ?)`,
    [data.status, data.created_at]
  );
};

export const getActiveUser = async () => {
  const db = await open_db();
  return await db.getFirstAsync(
    `SELECT * FROM user WHERE status = 'ACTIVO' LIMIT 1`
  );
};
