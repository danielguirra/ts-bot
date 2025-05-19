import {
   CommandInteraction,
   Guild,
   Message,
   SlashCommandBuilder,
   User,
} from 'discord.js';

import { env } from '../envs';
import { embedBuilder } from '../util/getEmbed';

export class HelpCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('ajuda').setDescription('ajuda');
   }

   async executeMessageCommand(commandMessage: Message) {
      if (commandMessage.guild) {
         const helpFun = this.getHelp(
            commandMessage.guild,
            commandMessage.author
         );

         return commandMessage.reply(helpFun);
      }
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      if (commandSlash.guild) {
         const helpFun = this.getHelp(commandSlash.guild, commandSlash.user);

         return commandSlash.reply(helpFun);
      }
   }

   getHelp(guild: Guild, user: User) {
      const roleMod = guild.roles.cache.find((role) => role.id === env.ROLEMOD);
      const channelRoles = guild.channels.cache.find(
         (channel) => channel.id === env.CHANNELROLES
      );
      const channelCommands = guild.channels.cache.find(
         (channel) => channel.id === env.CHANNELCOMMANDS
      );

      return {
         embeds: [
            embedBuilder(
               `Meu chamou?`,
               `${user}
        Se precisa de cargos estão aqui: ${channelRoles},
        Comandos: ${channelCommands}
        Qualquer coisa pode perguntar a eles ${roleMod}que irão te ajudar!`
            ),
         ],
      };
   }
}
