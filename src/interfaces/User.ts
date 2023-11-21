export type IUser = {
  id: string;
  guildId: string;
  username: string;
  nickLol: string;
};

export interface IUserArray {
  document: Array<IUser>;
}
