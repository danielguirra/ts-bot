import {
   SlashCommandBuilder,
   Message,
   CommandInteraction,
   InteractionResponse,
} from 'discord.js';

export class Command {
   constructor(comm: Command) {
      Object.assign(this, comm);
   }

   data!:
      | SlashCommandBuilder
      | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
   executeMessageCommand!: (
      message: Message
   ) => Promise<Message<boolean> | void | undefined>;
   executeSlashCommand!: (
      commandSlash: CommandInteraction
   ) => Promise<
      void | Message<boolean> | InteractionResponse<boolean> | undefined
   >;
}
