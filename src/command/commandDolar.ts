import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { channelItsGuildTextChannel } from '../service/channelItsGuildTextChannel';
import { sendDolarDaily } from '../service/sendDolarDaily';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const dolar = {
  data: new SlashCommandBuilder()
    .setName('dolar')
    .setDescription('retorna valor do dolar atual'),
  async executeMessageCommand(commandMessage: Message) {
    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    const embed = await sendDolarDaily(channel, true);
    return commandMessage.reply(embed || '');
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    const embed = await sendDolarDaily(channel, true);
    return commandSlash.reply(embed || '');
  },
};
