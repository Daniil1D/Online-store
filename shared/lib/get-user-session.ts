import { getServerSession } from 'next-auth';
import { authOptions } from '../contants/auth-options';

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
