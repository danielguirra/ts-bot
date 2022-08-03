import {
  EmbedBuilder,
  Interaction,
  Message,
  SlashCommandBuilder,
} from 'discord.js';
import { type } from 'os';

import { sendClimateCurrentTime } from '../service/send/sendClimate';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';

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
    const channelToSendClimate = await channelItsGuildTextChannel(
      commandMessage.channel,
    );
    if (channelToSendClimate) {
      const city: string = commandMessage.content.replace('*clima ', '');
      const climate = await sendClimateCurrentTime(channelToSendClimate, city);
      return climate;
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const city: any = commandSlash.options.getString('city') || 'franca';
    const channelToSendClimate = commandSlash.channel || undefined;
    if (channelToSendClimate) {
      return commandSlash.reply('Carregando...').then(message => {
        const sender = loadinCreator(commandSlash, {
          channel: channelToSendClimate,
          func: sendClimateCurrentTime(city),
        });
      });
    }
  },
};
