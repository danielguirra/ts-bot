import { InteractionType, Message } from 'discord.js';
import http from 'http';

import { client } from './client/client';
import { commands } from './command/builder';
import { env } from './envs';
import { GuildMemberAdd } from './service/guildMemberAdd';
import { DailyScheduler } from './service/on';
import { Deploy } from './util/deployCommands';
import { logDate } from './util/logDate';

const port = env.PORT || 3000;

http
   .createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Servidor online');
   })
   .listen(port, () => {
      console.log(logDate() + ' O bot está rodando na porta ' + port);
   });

new DailyScheduler(client, env.BOTTOKEN!).init();
new Deploy();

client.on('guildMemberAdd', (newMember) => {
   new GuildMemberAdd(newMember);
});

client.on('interactionCreate', async (interaction) => {
   if (interaction.type !== InteractionType.ApplicationCommand) return;
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
      console.error(logDate() + ' Erro ao executar comando slash:', error);
   }
});

client.on('messageCreate', async (message: Message) => {
   const prefix = env.PREFIX || '*';
   if (message.author.bot || !message.content.startsWith(prefix)) return;

   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const commandName = args.shift()?.toLowerCase();

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
            `${logDate()} [ERRO] ao executar ${commandName}:`,
            error
         );
      }
   }
});
