import { open_db } from '../db/db';
import { DEFAULT_DISTRIBUTION } from '../constants/defaultDistribution';

export type DistributionInput = {
  distribution_category_id: number;
  percentage: number;
};

export const saveDistributionConfiguration = async (
  userId: number,
  data: DistributionInput[]
) => {
  const db = await open_db();
  const createdAt = new Date().toISOString();

  await db.runAsync(
    `DELETE FROM distribution_configuration WHERE user_id = ?`,
    [userId]
  );

  for (const item of data) {
    await db.runAsync(
      `INSERT INTO distribution_configuration
       (user_id, distribution_category_id, percentage, created_at, status)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, item.distribution_category_id, item.percentage, createdAt, 'Activo']
    );
  }
};

export const saveDefaultDistribution = async (userId: number) => {
  const db = await open_db();
  const createdAt = new Date().toISOString();

  const categories = await db.getAllAsync<{
    id_distribution_category: number;
    name: string;
  }>(`SELECT id_distribution_category, name FROM distribution_category`);

  for (const def of DEFAULT_DISTRIBUTION) {
    const category = categories.find(c => c.name === def.name);
    if (!category) continue;

    await db.runAsync(
      `INSERT INTO distribution_configuration
       (user_id, distribution_category_id, percentage, created_at, status)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, category.id_distribution_category, def.percentage, createdAt, 'Activo']
    );
  }
};
