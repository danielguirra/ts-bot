import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { sendLoveMessageDaily } from '../service/send/sendLoveMessageDaily';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const love = {
  data: new SlashCommandBuilder()
    .setName('love')
    .setDescription('envia uma messagem de amor no canal'),
  async executeMessageCommand(commandMessage: Message) {
    const love = commandMessage.content.replace('*love ', '');
    if (love) {
      const loveSend = await sendLoveMessageDaily(
        await channelItsGuildTextChannel(commandMessage.channel),
      );
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    commandSlash.reply('❤').then(async () => {
      const loveSend = await sendLoveMessageDaily(
        await channelItsGuildTextChannel(commandSlash.channel),
      );
    });
  },
};
