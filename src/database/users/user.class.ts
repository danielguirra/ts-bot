import e from "express";
import UserModel from "./user.model";

export class UserDB {
   id?: number;
   idDiscord!: string;
   username!: string;
   nickname!: string;
   city!: string;
   country!: string;
   dollarDaily!: boolean;
   climateDaily!: boolean;


   constructor(user: UserTypeDB) {
      Object.assign(this, user)
   }

   static async getUserByUserIdDiscord(userId: string) {
      try {

         const finder = await UserModel.findOne({
            where: {
               idDiscord: userId
            },
            logging: false
         })

         if (finder) {
            return new UserDB(finder.dataValues)
         }
         throw new Error('not find user based in userId ' + userId)

      } catch (error) {
         console.error(error);

         return 'Usuário não localizado ❌'
      }
   }


   static async getUsersIDsToSendClimate() {
      try {

         const finder = await UserModel.findAll({
            where: {
               climateDaily: true
            },
            logging: false
         });

         const users: UserDB[] = []
         for (const user of finder) {
            users.push(new UserDB(user.dataValues))
         }

         return users

      } catch (error) {
         throw error
      }
   }

   static async updateUserInfo(user: UserTypeDB): Promise<string> {
      try {

         const finder = await UserModel.findOne({
            where: {
               idDiscord: user.idDiscord
            },
            logging: false
         })

         if (finder) {
            await finder.setAttributes(user).save()
            return 'Usuário foi editado com sucesso ✅'
         }
         throw new Error('not find user based in userId ' + user.idDiscord)

      } catch (error) {
         console.error(error)

         return 'Usuário não localizado, para editar ❌'
      }
   }

   static async saveNewUser(user: UserTypeDB) {
      try {

         const finder = await UserModel.findOne({
            where: {
               idDiscord: user.idDiscord
            },

         })

         if (finder?.dataValues) {
            throw new Error('Usuário já está no banco ❌')
         }
         await UserModel.create(user)
         return 'Usuário salvo com sucesso ✅'
      } catch (error: any) {
         console.error(error)
         return error.message as string || 'Erro ❌'

      }
   }

   static async deleteUser(userId: number): Promise<boolean> {
      try {

         const finder = await UserModel.findOne({
            where: {
               id: userId
            },
            logging: false
         })

         if (finder) {
            await finder.destroy()
            return true
         }
         throw new Error('not find user based in userId ' + userId)

      } catch (error) {
         throw error
      }
   }
}


type UserTypeDB = {
   id?: number;
   idDiscord: string;
   username: string;
   nickname: string;
   city: string;
   country: string;
   dollarDaily: boolean;
   climateDaily: boolean;
}