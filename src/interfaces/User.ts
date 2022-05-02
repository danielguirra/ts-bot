import { IClimate } from './Climate';
import { IGuild } from './Guild';

export interface IUser {
  id: string;
  guild: IGuild;
  username: string;
  discriminator: string;
  userClimate: IClimate;
}
