import { IUser } from '../../../interfaces/User';
import { InsertOneUserApiMongoDb } from './InsertOneUser';

export async function saveUserDb(user: IUser) {
  if (user) {
    const userToSave = {
      user: user,
    };
    try {
      const save = await InsertOneUserApiMongoDb(userToSave.user);
      if (save) {
        return save;
      }
    } catch (error) {
      return error;
    }
  } else {
    return 'UserSave? 🤔';
  }
}
