import { create_tables } from './schema';
import { seed_database } from './seed';

export const init_database = async () => {
  await create_tables();
  await seed_database();
};
