import { open_db } from '../db/db';
import { CreateConsumptionCategoryDTO } from '../types/dto';

export const insertConsumptionCategory = async (
  data: CreateConsumptionCategoryDTO
) => {
  const db = await open_db();
  await db.runAsync(
    `INSERT INTO consumption_category
     (distribution_category_id, name, status, created_at)
     VALUES (?, ?, ?, ?)`,
    [
      data.distribution_category_id,
      data.name,
      data.status,
      data.created_at,
    ]
  );
};

export const getConsumptionCategories = async () => {
  const db = await open_db();
  return await db.getAllAsync(
    `SELECT * FROM consumption_category WHERE status = 'ACTIVO'`
  );
};
