import { Message } from "discord.js";
import dotenv from "dotenv";

import { client } from "../client/client";
import { Command, commands } from "../command/Builder";
import { logDate } from "./logDate";

dotenv.config();

const prefix = process.env.PREFIX;

export const messageCreate = client.on(
  "messageCreate",
  async (message: Message) => {
    const args: any = message.content.slice(prefix?.length).trim().split(/ +/);
    const command = args[0].toLowerCase() as Command;

    if (typeof command === "undefined") return;
    const commandExecutor = commands.get(command);
    if (commandExecutor)
      try {
        commandExecutor.executeMessageCommand(message);

        console.log(
          logDate() +
            "Comando Message: " +
            commandExecutor.data.name +
            " foi usado"
        );
      } catch (error) {
        return;
      }
  }
);
