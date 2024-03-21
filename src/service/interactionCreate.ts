import { InteractionType } from 'discord.js';

import { client } from '../client/client';
import { commands } from '../command/Builder';
import { logDate } from '../util/logDate';

export const interactionCreate = client.on(
   'interactionCreate',

   async (interaction) => {
      if (interaction.type === InteractionType.ApplicationCommand) {
         if (!interaction.isChatInputCommand()) return;
         const command = commands.get(interaction.commandName as any);
         if (!command) return;
         try {
            await command.executeSlashCommand(interaction);

            console.log(
               logDate() +
                  'Comando Slash: ' +
                  command.data.name +
                  ' foi usado pelo : ' +
                  interaction.user.id
            );
         } catch (error) {
            return;
         }
      }
   }
);
