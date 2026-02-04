import { insertIncome } from '../repositories/income.repository';
import { insertIncomeDistribution } from '../repositories/income-distribution.repository';
import { getDistributionConfigurationByUser } from '../repositories/distribution-configuration.repository';
import { getBalancesByUser } from '../repositories/distribution-balance.repository';
import { insertDistributionBalance } from '../repositories/distribution-balance.repository';

export const registerIncome = async (
  userId: number,
  amount: number,
  catalogIncomeTypeId: number,
  date: string,
  description: string
) => {
  const createdAt = new Date().toISOString();

  // 1️⃣ Insert income
  await insertIncome({
    user_id: userId,
    amount,
    catalog_income_type_id: catalogIncomeTypeId,
    date,
    description,
    status: 'ACTIVO',
    created_at: createdAt,
  });

  // 2️⃣ Get config
  const config = await getDistributionConfigurationByUser(userId);
  const balances = await getBalancesByUser(userId);

  // 3️⃣ Distribute
  for (const c of config) {
    const assigned = (amount * c.percentage) / 100;

    // income_distribution
    await insertIncomeDistribution({
      income_id: null as any, // ⚠ SQLite workaround (ver nota abajo)
      distribution_category_id: c.distribution_category_id,
      amount_assigned: assigned,
      status: 'ACTIVO',
      created_at: createdAt,
    });

    // balance
    const balance = balances.find(
      b => b.distribution_category_id === c.distribution_category_id
    );

    if (balance) {
      balance.balance += assigned;
    } else {
      await insertDistributionBalance({
        user_id: userId,
        distribution_category_id: c.distribution_category_id,
        balance: assigned,
        status: 'ACTIVO',
        created_at: createdAt,
      });
    }
  }
};
