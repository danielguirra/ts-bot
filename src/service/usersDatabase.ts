import { getUserAllDatabase } from '../database/querys/user/getUserClimate';

export const users = async (): Promise<string> => {
  return await getUserAllDatabase();
};
