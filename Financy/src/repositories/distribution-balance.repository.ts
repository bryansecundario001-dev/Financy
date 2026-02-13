import { open_db } from '../db/db';
import { DistributionBalance } from '../types/database';
import { CreateDistributionBalanceDTO } from '../types/dto';

// export const insertDistributionBalance = async (
//   data: CreateDistributionBalanceDTO
// ) => {
//   const db = await open_db();
//   await db.runAsync(
//     `INSERT INTO distribution_balance
//      (user_id, distribution_category_id, balance, status, created_at)
//      VALUES (?, ?, ?, ?, ?)`,
//     [
//       data.user_id,
//       data.distribution_category_id,
//       data.balance,
//       data.status,
//       data.created_at,
//     ]
//   );
// };

export const insertDistributionBalances = async (
  userId: number,
  data: { distribution_category_id: number; balance: number }[]
) => {
  const db = await open_db();
  const now = new Date().toISOString();

  await db.execAsync('BEGIN TRANSACTION');

  try {
    for (const item of data) {
      await db.runAsync(
        `INSERT INTO distribution_balance
         (user_id, distribution_category_id, balance, created_at, status)
         VALUES (?, ?, ?, ?, ?)`,
        [userId, item.distribution_category_id, item.balance, now, 'Activo']
      );
    }

    await db.execAsync('COMMIT');
  } catch (error) {
    await db.execAsync('ROLLBACK');
    throw error;
  }
};

export const getBalancesByUser = async (userId: number): Promise<DistributionBalance[]> => {
  const db = await open_db();
  return await db.getAllAsync(
    `SELECT * FROM distribution_balance
     WHERE user_id = ? AND status = 'ACTIVO'`,
    [userId]
  );
};
