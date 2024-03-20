import { Message, SlashCommandBuilder } from 'discord.js';

import { sendLoveMessageDaily } from '../service/senders/sendLoveMessageDaily';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { Command } from './Builder';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const love: Command = {
   data: new SlashCommandBuilder()
      .setName('love')
      .setDescription('envia uma messagem de amor no canal'),
   async executeMessageCommand(commandMessage: Message) {
      const love = commandMessage.content.replace('*love ', '');
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (love && channel) {
         const loveSend = await sendLoveMessageDaily(channel);
      }
   },
   async executeSlashCommand(commandSlash) {
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (!commandSlash.isChatInputCommand()) return;
      if (channel) {
         commandSlash.reply('❤').then(async () => {
            const loveSend = await sendLoveMessageDaily(channel);
         });
      }
   },
};
