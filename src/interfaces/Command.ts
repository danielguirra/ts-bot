import {
   CommandInteraction,
   InteractionResponse,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

type SlashResponse = Promise<
   void | Message<boolean> | InteractionResponse<boolean> | undefined
>;

type MessageResponse = Promise<Message<boolean> | void | undefined>;

type DataTypeForCommand =
   | SlashCommandBuilder
   | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

export class Command extends SlashCommandBuilder {
   executeMessageCommand!: (message: Message) => MessageResponse;
   executeSlashCommand!: (commandSlash: CommandInteraction) => SlashResponse;
}
