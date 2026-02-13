import { open_db } from '../db/db';
import { insertDistributionBalances } from '../repositories/distribution-balance.repository';

export type InitialBalanceInput = {
  distribution_category_id: number;
  balance: number;
};

export const saveInitialBalances = async (
  userId: number,
  data: { distribution_category_id: number; balance: number }[]
) => {

  const total = data.reduce((acc, item) => acc + item.balance, 0);

  if (total <= 0) {
    throw new Error('El saldo total debe ser mayor a 0');
  }

  await insertDistributionBalances(userId, data);
};

export const hasDistributionBalance = async (userId: number) => {
  const db = await open_db();

  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count 
     FROM distribution_balance
     WHERE user_id = ?`,
    [userId]
  );

  return (result?.count ?? 0) > 0;
};