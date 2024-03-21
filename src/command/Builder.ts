import {
   Collection,
   CommandInteraction,
   Interaction,
   InteractionResponse,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { allComands } from './allComands';
import { Command } from '../interfaces/Command';

export const commands = new Collection() as Collection<string, Command>;

for (const key of allComands) {
   const command = new Command(key);

   try {
      commands.set(command.data.name, command);
   } catch (error) {
      console.error(error, {
         command,
         expected: {
            data: SlashCommandBuilder,
            executeMessageCommand: Promise<Function>,
            executeSlashCommand: Promise<Function>,
         },
      });
      break;
   }
}
