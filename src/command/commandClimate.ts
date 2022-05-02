import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { channelItsGuildTextChannel } from '../service/channelItsGuildTextChannel';
import { sendClimateCurrentTime } from '../service/sendClimate';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param climate
 * @danielguirra
 */
export const climate = {
  data: new SlashCommandBuilder()
    .setName('clima')
    .setDescription('retorna o clima da cidade fornecida')
    .addStringOption(options =>
      options
        .setName('city')
        .setDescription('cidade para retornar')
        .setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const channel = channelItsGuildTextChannel(commandMessage.channel);
    const city: string = commandMessage.content.replace('*clima ', '');
    const climate = await sendClimateCurrentTime(await channel, city);
    return climate;
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const city: string = commandSlash.options.getString('city') || 'franca';
    const channel = commandSlash.channel || undefined;
    const climate = await sendClimateCurrentTime(undefined, city, channel);
    const climateToSend = await climateItsTrue(climate);
    return commandSlash.reply(climateToSend);
  },
};

export async function climateItsTrue(channel: any) {
  if (channel) {
    const result: string = channel;
    return result;
  } else {
    return '';
  }
}
