import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { sendClimate } from '../service/send/sendClimate';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

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
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const city: any = commandSlash.options.get('cidade') || 'franca';
    const channel = await channelItsGuildTextChannel(commandSlash.channel);

    const clima: any = await sendClimate(channel, city);

    return commandSlash.reply({ embeds: [clima] });
  },
};
