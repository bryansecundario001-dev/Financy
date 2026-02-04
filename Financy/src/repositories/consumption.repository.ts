import { open_db } from '../db/db';
import { CreateConsumptionDTO } from '../types/dto';

export const insertConsumption = async (data: CreateConsumptionDTO) => {
  const db = await open_db();
  await db.runAsync(
    `INSERT INTO consumption
     (user_id, distribution_category_id, consumption_category_id,
      amount, description, date, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.distribution_category_id,
      data.consumption_category_id,
      data.amount,
      data.description ?? null,
      data.date,
      data.status,
      data.created_at,
    ]
  );
};

export const getConsumptionsByUser = async (userId: number) => {
  const db = await open_db();
  return await db.getAllAsync(
    `SELECT * FROM consumption WHERE user_id = ? AND status = 'ACTIVO'`,
    [userId]
  );
};
