import { UserDatabase } from "../../database/querys/user/user";

export const users = async () => {
  try {
    return await new UserDatabase().getAllUsersBasedInGuildId(
      "690694428729278535"
    );
  } catch (error: any) {
    console.error(error);
    return error.message as string;
  }
};
