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

   static async getUserByUserIdDiscord(userId: number) {
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
         throw error
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

   static async updateUserInfo(user: UserTypeDB): Promise<boolean> {
      try {

         const finder = await UserModel.findOne({
            where: {
               id: user.id
            },
            logging: false
         })

         if (finder) {
            await finder.setAttributes(user).save()
            return true
         }
         throw new Error('not find user based in userId ' + user.idDiscord)

      } catch (error) {
         throw error
      }
   }

   static async saveNewUser(user: UserTypeDB): Promise<boolean | string> {
      try {

         const finder = await UserModel.findOne({
            where: {
               idDiscord: user.idDiscord
            },

         })

         if (!finder?.dataValues) {
            await UserModel.create(user)
            return true
         }
         return 'Usuário já salvo seu fedido'
      } catch (error) {
         throw error
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