import { Guild, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { Command } from '../interfaces/Command';
import { env } from '../envs';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const help: Command = {
   data: new SlashCommandBuilder().setName('ajuda').setDescription('ajuda'),
   async executeMessageCommand(commandMessage: Message) {
      const helpFun = getHelp(commandMessage.guild);

      return commandMessage.reply({
         embeds: [
            embedBuilder(
               `Meu chamou?`,
               `${commandMessage.author}
     Se precisa de cargos estão aqui: ${helpFun?.channelRoles},
     Comandos: ${helpFun?.channelCommands}
     Qualquer coisa pode perguntar a eles ${helpFun?.roleMod}que irão te ajudar!`
            ),
         ],
      });
   },
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const helpFun = getHelp(commandSlash.guild);

      return commandSlash.reply({
         embeds: [
            embedBuilder(
               `Meu chamou?`,
               `${commandSlash.user}
     Se precisa de cargos estão aqui: ${helpFun?.channelRoles},
     Comandos: ${helpFun?.channelCommands}
     Qualquer coisa pode perguntar a eles ${helpFun?.roleMod}que irão te ajudar!`
            ),
         ],
      });
   },
};

function getHelp(guild: Guild | null) {
   if (guild) {
      const roleMod = guild.roles.cache.find((role) => role.id === env.ROLEMOD);
      const channelRoles = guild.channels.cache.find(
         (channel) => channel.id === env.CHANNELROLES
      );
      const channelCommands = guild.channels.cache.find(
         (channel) => channel.id === env.CHANNELCOMMANDS
      );

      return {
         roleMod,
         channelCommands,
         channelRoles,
      };
   }
}
