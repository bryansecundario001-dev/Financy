import { open_db } from '../db/db';
import { CreateCatalogDTO } from '../types/dto';

export const insertCatalog = async (data: CreateCatalogDTO) => {
  const db = await open_db();
  await db.runAsync(
    `INSERT INTO catalog (type, code, name, status, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [data.type, data.code, data.name, data.status, data.created_at]
  );
};

export const getCatalogByType = async (type: string) => {
  const db = await open_db();
  return await db.getAllAsync(
    `SELECT * FROM catalog WHERE type = ? AND status = 'ACTIVO'`,
    [type]
  );
};
