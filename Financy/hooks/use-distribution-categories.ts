import { useEffect, useState } from 'react';
import { open_db } from '../src/db/db';

export type DistributionCategory = {
  id_distribution_category: number;
  name: string;
};

export const useDistributionCategories = () => {
  const [categories, setCategories] = useState<DistributionCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const db = await open_db();
      const result = await db.getAllAsync<DistributionCategory>(
        `SELECT id_distribution_category, name FROM distribution_category WHERE status = 'Activo' ORDER BY display_order`
      );
      setCategories(result);
      setLoading(false);
    };
    load();
  }, []);

  return { categories, loading };
};
