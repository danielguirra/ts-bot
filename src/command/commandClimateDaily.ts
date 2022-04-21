import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { channelItsGuildTextChannel } from '../service/channelItsGuildTextChannel';
import { sendClimate } from '../service/sendClimate';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const climateDaily = {
  data: new SlashCommandBuilder()
    .setName('climadiario')
    .setDescription('retorna o clima diário das 00:00 até as 21:00')
    .addStringOption(options =>
      options
        .setName('cidade')
        .setDescription('cidade a ser retornada')
        .setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const city = commandMessage.content.replace('*clima ', '') || 'franca';
    const channel = await channelItsGuildTextChannel(commandMessage.channel);

    const clima: any = await sendClimate(channel, city);

    return commandMessage.reply({ embeds: [clima] });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const city = commandSlash.options.getString('cidade') || 'franca';
    const channel = await channelItsGuildTextChannel(commandSlash.channel);

    const clima: any = await sendClimate(channel, city);

    return commandSlash.reply({ embeds: [clima] });
  },
};
