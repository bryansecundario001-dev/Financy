import { open_db } from '../db/db';
import { CreateIncomeDTO } from '../types/dto';

export const insertIncome = async (data: CreateIncomeDTO) => {
  const db = await open_db();
  await db.runAsync(
    `INSERT INTO income
     (user_id, amount, catalog_income_type_id, date, description, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.amount,
      data.catalog_income_type_id,
      data.date,
      data.description,
      data.status,
      data.created_at,
    ]
  );
};

export const getIncomeByUser = async (userId: number) => {
  const db = await open_db();
  return await db.getAllAsync(
    `SELECT * FROM income WHERE user_id = ? AND status = 'ACTIVO'`,
    [userId]
  );
};
