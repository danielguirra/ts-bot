import { IUser } from '../../../interfaces/User';
import { verifyUserExists } from './VerifyUserExists';

export async function verifyUser(user: IUser) {
  if (user) {
    const userToVeri = {
      user: user,
    };

    try {
      const verf = await verifyUserExists(userToVeri.user);
      if (verf) {
        return verf;
      }
    } catch (error) {
      return error;
    }
  }
}
