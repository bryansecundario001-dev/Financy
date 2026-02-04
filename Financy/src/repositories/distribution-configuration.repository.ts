import { open_db } from '../db/db';
import { DistributionConfiguration } from '../types/database';
import { CreateDistributionConfigurationDTO } from '../types/dto';

export const insertDistributionConfiguration = async (
  data: CreateDistributionConfigurationDTO
) => {
  const db = await open_db();
  await db.runAsync(
    `INSERT INTO distribution_configuration
     (user_id, distribution_category_id, percentage, status, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.distribution_category_id,
      data.percentage,
      data.status,
      data.created_at,
    ]
  );
};

export const getDistributionConfigurationByUser = async (
  userId: number
): Promise<DistributionConfiguration[]> => {
  const db = await open_db();

  return await db.getAllAsync<DistributionConfiguration>(
    `SELECT * FROM distribution_configuration
     WHERE user_id = ? AND status = 'ACTIVO'`,
    [userId]
  );
};

export const updateDistributionConfiguration = async (
  id: number,
  percentage: number
) => {
  const db = await open_db();
  await db.runAsync(
    `UPDATE distribution_configuration
     SET percentage = ?
     WHERE id_distribution_configuration = ?`,
    [percentage, id]
  );
};
