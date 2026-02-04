import { open_db } from '../db/db';
import { DistributionCategory } from '../types/database';
import { CreateDistributionCategoryDTO } from '../types/dto';

export const insertDistributionCategory = async (
  data: CreateDistributionCategoryDTO
) => {
  const db = await open_db();
  await db.runAsync(
    `INSERT INTO distribution_category
     (name, display_order, status, created_at)
     VALUES (?, ?, ?, ?)`,
    [data.name, data.display_order ?? null, data.status, data.created_at]
  );
};

export const getDistributionCategories = async (): Promise<DistributionCategory[]> => {
  const db = await open_db();
  return await db.getAllAsync(
    `SELECT * FROM distribution_category WHERE status = 'ACTIVO'
     ORDER BY display_order`
  );
};
