import { MongoClient } from "mongodb";

export class DatabaseConfig {
  private databaseUri: string = process.env.DATABASE_URI || "";
  private DatabaseName: string = process.env.DATABASE_NAME || "";

  private client = this.verificatorUri();

  public DB = this.client.db(this.DatabaseName);
  public collectionNames: {
    users: string;
    guilds: string;
  } = {
    users: process.env.DATABASE_COLLECTION_USERS || "Users",
    guilds: process.env.DATABASE_COLLECTIONS_GUILDS || "Guilds",
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
    throw new Error("URI DATABASE ENV");
  }
}
