import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { sendClimateCurrentTime } from '../service/send/sendClimate';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { Command } from './Builder';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param climate
 * @danielguirra
 */
export const climate: Command = {
   data: new SlashCommandBuilder()
      .setName('clima')
      .setDescription('retorna o clima da cidade fornecida')
      .addStringOption((options) =>
         options
            .setName('cidade')
            .setDescription('cidade para retornar')
            .setRequired(true)
      )
      .addStringOption((options) =>
         options
            .setName('pais_ou_estado')
            .setDescription('pais para ajudar na pesquisa por padrao brasil')
            .setRequired(false)
      ),
   async executeMessageCommand(commandMessage: Message) {
      return;
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const city = commandSlash.options.getString('cidade') || 'franca';
      const country =
         commandSlash.options.getString('pais_ou_estado') || 'brazil';
      const channelToSendClimate = commandSlash.channel;
      if (channelToSendClimate) {
         return commandSlash.reply('Carregando...').then(async (msg) => {
            const channel = await channelItsGuildTextChannel(
               channelToSendClimate
            );
            if (channel) {
               await sendClimateCurrentTime(channel, city, undefined, country);
            }
         });
      }
   },
};
