import { Message } from 'discord.js';

import { env } from '../envs';
import { client } from '../client/client';
import { commands } from '../command/Builder';
import { logDate } from '../util/logDate';

const prefix = env.PREFIX || '*';

export const messageCreate = client.on(
   'messageCreate',
   async (message: Message) => {
      const args = message.content.slice(prefix?.length).trim().split(/ +/);
      const command = (args[0].toLowerCase() as string) || undefined;

      if (typeof command === 'string') {
         const commandExecutor = commands.get(command);
         if (commandExecutor) {
            try {
               commandExecutor.executeMessageCommand(message);

               console.log(
                  logDate() +
                     'Comando Message: ' +
                     commandExecutor.data.name +
                     ' foi usado pelo : ' +
                     message.author.id
               );
            } catch (error) {
               return;
            }
         }
      }
   }
);
