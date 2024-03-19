import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { Sequelize } from 'sequelize';
export class DatabaseConfig {
   private databaseUri: string = process.env.DATABASE_URI || '';
   private DatabaseName: string = process.env.DATABASE_NAME || '';

   private client = this.verificatorUri();

   public DB = this.client.db(this.DatabaseName);
   public collectionNames: {
      users: string;
      guilds: string;
   } = {
      users: process.env.DATABASE_COLLECTION_USERS || 'Users',
      guilds: process.env.DATABASE_COLLECTIONS_GUILDS || 'Guilds',
   };

   connector = async () => {
      return await this.client.connect();
   };

   disconnection = async () => {
      return await this.client.close();
   };

   private verificatorUri() {
      if (this.databaseUri) {
         return new MongoClient(this.databaseUri);
      }
      throw new Error('URI DATABASE ENV');
   }
}

dotenv.config();
class Database {
   private static connection: Sequelize;
   private constructor() {}

   public static getConnection(): Sequelize {
      if (!Database.connection) {
         const requiredEnvVars = [
            'DB_NAME',
            'DB_USERNAME',
            'DB_PASSWORD',
            'DB_HOST',
            'DB_DIALECT',
         ];
         const missingEnvVars = requiredEnvVars.filter(
            (envVar) => !process.env[envVar]
         );
         if (missingEnvVars.length > 0) {
            // throw new Error(
            //   `As seguintes variáveis de ambiente estão faltando: ${missingEnvVars.join(
            //     ", "
            //   )}`
            // );
         }
         // const validDialects: Dialect[] = ["mysql", "postgres", "sqlite"];
         // const dialect = process.env.DB_DIALECT as Dialect;
         // if (!validDialects.includes(dialect)) {
         //   throw new Error(`Dialeto de banco de dados inválido: ${dialect}`);
         // }
         // const dbConfig = {
         //   database: process.env.DB_NAME as string,
         //   username: process.env.DB_USERNAME as string,
         //   password: process.env.DB_PASSWORD as string,
         //   host: process.env.DB_HOST as string,
         //   dialect: dialect,
         // };

         /**
          * Local Store for dev
          */
         Database.connection = new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite',
         });
      }

      return Database.connection;
   }
}

export default Database;
