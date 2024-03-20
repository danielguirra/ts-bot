import { Sequelize } from 'sequelize';

class Database {
   private static connection: Sequelize;
   private constructor() {}

   public static getConnection(): Sequelize {
      if (!Database.connection) {
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

/**
 *
 * Recomend MySql
 *
 */

// const requiredEnvVars = [
//    'DB_NAME',
//    'DB_USERNAME',
//    'DB_PASSWORD',
//    'DB_HOST',
//    'DB_DIALECT',
// ];
// const missingEnvVars = requiredEnvVars.filter(
//    (envVar) => !env[envVar]
// );
// if (missingEnvVars.length > 0) {
//    // throw new Error(
//    //   `As seguintes variáveis de ambiente estão faltando: ${missingEnvVars.join(
//    //     ", "
//    //   )}`
//    // );
// }
// const validDialects: Dialect[] = ["mysql", "postgres", "sqlite"];
// const dialect = env.DB_DIALECT as Dialect;
// if (!validDialects.includes(dialect)) {
//   throw new Error(`Dialeto de banco de dados inválido: ${dialect}`);
// }
// const dbConfig = {
//   database: env.DB_NAME as string,
//   username: env.DB_USERNAME as string,
//   password: env.DB_PASSWORD as string,
//   host: env.DB_HOST as string,
//   dialect: dialect,
// };
