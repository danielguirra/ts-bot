import {
  Collection,
  CommandInteraction,
  InteractionResponse,
  Message,
  SlashCommandBuilder,
} from "discord.js";

import { allComands } from "./allComands";

export const commands = new Collection() as Collection<Command, Command>;

for (const key in allComands) {
  if (Object.prototype.hasOwnProperty.call(allComands, key)) {
    const element = allComands[key];

    commands.set(element.data.name, element);
  }
}

export type Command = {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  executeMessageCommand: (
    message: Message
  ) => Promise<Message<boolean> | void | undefined>;
  executeSlashCommand: (
    messcommandSlashage: CommandInteraction
  ) => Promise<
    InteractionResponse<boolean> | void | undefined | Message<boolean>
  >;
};
