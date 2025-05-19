import { InteractionType } from 'discord.js';

import { client } from '../client/client';

import { commands } from '../command/build';
import { logDate } from '../util/logDate';

export const interactionCreate = client.on(
   'interactionCreate',

   async (interaction) => {
      if (interaction.type === InteractionType.ApplicationCommand) {
         if (!interaction.isChatInputCommand()) return;
         const command = commands.get(interaction.commandName);
         if (!command) return;
         try {
            await command.executeSlashCommand(interaction);

            console.log(
               `${logDate()}\x1b[33m[SLASH]\x1b[0m \x1b[31m${command.name.toUpperCase()}\x1b[0m usado por \x1b[35m${
                  interaction.user.tag
               }\x1b[0m \x1b[34m(${interaction.user.id})\x1b[0m`
            );
         } catch (error) {
            return;
         }
      }
   }
);
