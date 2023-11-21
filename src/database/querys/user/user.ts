import { IUser } from "../../../interfaces/User";
import { DatabaseConfig } from "../../config";

export class UserDatabase extends DatabaseConfig {
  async getAllUsersBasedInGuildId(guildId: string) {
    try {
      return await this.DB.collection(this.collectionNames.users)
        .find({
          guildId,
        })
        .toArray();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async saveNewUser(user: IUser) {
    try {
      const findIfExistInDatabase = await this.DB.collection(
        this.collectionNames.users
      ).findOne({ id: user.id });
      if (findIfExistInDatabase) {
        const update = await this.DB.collection(
          this.collectionNames.users
        ).updateOne(
          {
            id: findIfExistInDatabase.id,
          },
          {
            $set: {
              id: user.id,
              guildId: user.guildId,
              username: user.username,
              nickLol: user.nickLol,
            },
          }
        );
        if (update) {
          return (
            "Nick atualizado somente, pois usuário já salvo " + user.nickLol
          );
        }
      }

      const save = await this.DB.collection(
        this.collectionNames.users
      ).insertOne(user);
      if (save) {
        return user.nickLol;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
