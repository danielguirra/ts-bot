import { getUserAllDatabase } from '../../database/querys/user/getUserClimate';
import { IUser } from '../../interfaces/User';

export const users = async (): Promise<IUser[] | string> => {
  try {
    return await getUserAllDatabase();
  } catch (error: any) {
    console.error(error)
    return error.message as string
  }
};
