import {
   SlashCommandBuilder,
   Message,
   CommandInteraction,
   InteractionResponse,
} from 'discord.js';

type SlashResponse = Promise<
   void | Message<boolean> | InteractionResponse<boolean> | undefined
>;

type MessageResponse = Promise<Message<boolean> | void | undefined>;

type DataTypeForCommand =
   | SlashCommandBuilder
   | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

export class Command {
   constructor(comm: Command) {
      if (comm instanceof Command) Object.assign(this, comm);
   }

   data!: DataTypeForCommand;
   executeMessageCommand!: (message: Message) => MessageResponse;
   executeSlashCommand!: (commandSlash: CommandInteraction) => SlashResponse;
}
