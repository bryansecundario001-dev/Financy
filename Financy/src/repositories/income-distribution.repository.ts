import { open_db } from '../db/db';
import { CreateIncomeDistributionDTO } from '../types/dto';

export const insertIncomeDistribution = async (
  data: CreateIncomeDistributionDTO
) => {
  const db = await open_db();
  await db.runAsync(
    `INSERT INTO income_distribution
     (income_id, distribution_category_id, amount_assigned, status, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.income_id,
      data.distribution_category_id,
      data.amount_assigned,
      data.status,
      data.created_at,
    ]
  );
};
