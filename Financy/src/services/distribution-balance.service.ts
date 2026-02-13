import { open_db } from '../db/db';

export type InitialBalanceInput = {
  distribution_category_id: number;
  balance: number;
};

export const saveInitialBalances = async (
  userId: number,
  balances: InitialBalanceInput[]
) => {
  const db = await open_db();
  const createdAt = new Date().toISOString();

  await db.runAsync(
    `DELETE FROM distribution_balance WHERE user_id = ?`,
    [userId]
  );

  for (const item of balances) {
    await db.runAsync(
      `INSERT INTO distribution_balance
       (user_id, distribution_category_id, balance, created_at, status)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, item.distribution_category_id, item.balance, createdAt, 'Activo']
    );
  }
};
