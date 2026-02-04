import {
  getDistributionConfigurationByUser,
  insertDistributionConfiguration,
  updateDistributionConfiguration,
} from '../repositories/distribution-configuration.repository';

import { getDistributionCategories } from '../repositories/distribution-category.repository';
import { DistributionConfiguration } from '../types/database';
import { RecordStatus } from '../types/common';
import { DistributionPercentageDTO } from '../types/dto';

/**
 * Crea o actualiza la configuración de distribución del usuario
 */
export const saveDistributionConfiguration = async (
  userId: number,
  input: DistributionPercentageDTO[]
): Promise<void> => {
  // 1️⃣ Validaciones básicas
  if (!input || input.length === 0) {
    throw new Error('Debe enviar al menos una categoría');
  }

  const total = input.reduce((sum, i) => sum + i.percentage, 0);
  if (total !== 100) {
    throw new Error('La suma de los porcentajes debe ser 100%');
  }

  if (input.some(i => i.percentage < 0)) {
    throw new Error('Los porcentajes no pueden ser negativos');
  }

  // 2️⃣ Validar que vengan TODAS las categorías
  const categories = await getDistributionCategories();

  if (categories.length !== input.length) {
    throw new Error(
      'Debe configurar todas las categorías de distribución'
    );
  }

  const categoryIds = categories.map(c => c.id_distribution_category);

  for (const i of input) {
    if (!categoryIds.includes(i.distribution_category_id)) {
      throw new Error('Categoría de distribución inválida');
    }
  }

  // 3️⃣ Obtener configuración existente
  const existing: DistributionConfiguration[] =
    await getDistributionConfigurationByUser(userId);

  const createdAt = new Date().toISOString();

  // 4️⃣ Si NO existe configuración → INSERT
  if (existing.length === 0) {
    for (const item of input) {
      await insertDistributionConfiguration({
        user_id: userId,
        distribution_category_id: item.distribution_category_id,
        percentage: item.percentage,
        status: 'ACTIVO' as RecordStatus,
        created_at: createdAt,
      });
    }
    return;
  }

  // 5️⃣ Si existe → UPDATE
  for (const item of input) {
    const current = existing.find(
      e =>
        e.distribution_category_id ===
        item.distribution_category_id
    );

    if (!current) {
      throw new Error(
        'Configuración inconsistente. Falta una categoría.'
      );
    }

    await updateDistributionConfiguration(
      current.id_distribution_configuration,
      item.percentage
    );
  }
};
