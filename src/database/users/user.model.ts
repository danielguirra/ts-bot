import { DataTypes, Model } from 'sequelize';

import Database from '../config';
import { UserDB } from './user.class';

const sequelize = Database.getConnection();

class UserModel extends Model<UserDB> implements UserDB {
   id!: number;
   idDiscord!: string;
   username!: string;
   nickname!: string;
   city!: string;
   country!: string;
   dollarDaily!: boolean;
   climateDaily!: boolean;
}

UserModel.init(
   {
      id: {
         autoIncrement: true,
         primaryKey: true,
         allowNull: false,
         type: DataTypes.INTEGER,
      },
      idDiscord: {
         allowNull: false,
         unique: true,
         type: DataTypes.STRING,
      },
      username: {
         allowNull: false,
         type: DataTypes.STRING,
      },
      nickname: {
         allowNull: false,
         type: DataTypes.STRING,
      },
      city: {
         allowNull: false,
         type: DataTypes.STRING,
      },
      country: {
         allowNull: false,
         type: DataTypes.STRING,
      },
      dollarDaily: {
         allowNull: true,
         type: DataTypes.BOOLEAN,
      },
      climateDaily: {
         allowNull: true,
         type: DataTypes.BOOLEAN,
      },
   },
   {
      sequelize,
      tableName: 'users',
   }
);

export default UserModel;
