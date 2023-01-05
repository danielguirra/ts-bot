import { getUserAllDatabase } from '../../database/querys/user/getUserClimate';
import { IUserArray } from '../../interfaces/User';

export const users = async (): Promise<IUserArray | undefined> => {
  try {
    return await getUserAllDatabase();
  } catch (error) {
    console.log(error)
  }
};
