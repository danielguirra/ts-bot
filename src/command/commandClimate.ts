import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { sendClimateCurrentTime } from '../service/send/sendClimate';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

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
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const city: any = commandSlash.options.getString('city') || 'franca';
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
