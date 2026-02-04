import { createUser, getActiveUser } from '../repositories/user.repository';

export const ensureUserExists = async () => {
  const user = await getActiveUser();

  if (!user) {
    await createUser({
      status: 'ACTIVO',
      created_at: new Date().toISOString(),
    });

    return await getActiveUser();
  }

  return user;
};
