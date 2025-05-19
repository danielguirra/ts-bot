import { Message } from 'discord.js';

import { client } from '../client/client';
import { commands } from '../command/builder';
import { env } from '../envs';
import { logDate } from '../util/logDate';

const prefix = env.PREFIX || '*';

export const messageCreate = client.on(
   'messageCreate',
   async (message: Message) => {
      if (message.author.bot || !message.content.startsWith(prefix)) return;

      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift()?.toLowerCase(); // Pega o nome do comando

      if (!commandName) return;

      const command = commands.get(commandName);

      if (command && typeof command.executeMessageCommand === 'function') {
         try {
            await command.executeMessageCommand(message);

            console.log(
               `${logDate()}\x1b[35m[MSG]\x1b[0m \x1b[31m${command.name.toUpperCase()}\x1b[0m usado por \x1b[35m${
                  message.author.tag
               }\x1b[0m \x1b[34m(${message.author.id})\x1b[0m`
            );
         } catch (error) {
            console.error(
               `${logDate()}\x1b[31m[ERRO]\x1b[0m Falha ao executar ${commandName}:`,
               error
            );
         }
      }
   }
);
