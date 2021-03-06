import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Guild, Message } from 'discord.js';
import dotenv from 'dotenv';

import { embedBuilder } from '../../src/util/getEmbed';

dotenv.config();
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const help = {
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
     Qualquer coisa pode perguntar a eles ${helpFun?.roleMod}que irão te ajudar!`,
        ),
      ],
    });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const helpFun = getHelp(commandSlash.guild);

    return commandSlash.reply({
      embeds: [
        embedBuilder(
          `Meu chamou?`,
          `${commandSlash.user}
     Se precisa de cargos estão aqui: ${helpFun?.channelRoles},
     Comandos: ${helpFun?.channelCommands}
     Qualquer coisa pode perguntar a eles ${helpFun?.roleMod}que irão te ajudar!`,
        ),
      ],
    });
  },
};

function getHelp(guild: Guild | null) {
  if (guild) {
    const roleMod = guild.roles.cache.find(
      role => role.id === process.env.ROLEMOD,
    );
    const channelRoles = guild.channels.cache.find(
      channel => channel.id === process.env.CHANNELROLES,
    );
    const channelCommands = guild.channels.cache.find(
      channel => channel.id === process.env.CHANNELCOMMANDS,
    );

    return {
      roleMod,
      channelCommands,
      channelRoles,
    };
  }
}
