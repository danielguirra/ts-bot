import {
   Collection,
   CommandInteraction,
   Interaction,
   InteractionResponse,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { allComands } from './allComands';

export class Command {
   data!:
      | SlashCommandBuilder
      | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
   executeMessageCommand!: (
      message: Message
   ) => Promise<Message<boolean> | void | undefined>;
   executeSlashCommand!: (
      commandSlash: CommandInteraction | Interaction
   ) => Promise<
      void | Message<boolean> | InteractionResponse<boolean> | undefined
   >;
}

export const commands = new Collection() as Collection<string, Command>;

for (const key of allComands) {
   if (key instanceof Command) commands.set(key.data.name, key);
}
