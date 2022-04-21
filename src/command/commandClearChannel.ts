import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { channelItsGuildTextChannel } from '../service/channelItsGuildTextChannel';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const clearChannel = {
  data: new SlashCommandBuilder()
    .setName('cls')
    .setDescription('apaga mensagem de ate 15 dias')
    .addIntegerOption(options =>
      options
        .setName('value')
        .setDescription('valor a ser deletedo')
        .setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const num: number = stringForNumber(
      commandMessage.content.replace('*cls ', ''),
    );
    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    const del = await channel.bulkDelete(num);
    if (del) {
      commandMessage.reply('Foi apagado ' + num);
      const time = await new Promise(f => setTimeout(f, 1000));
      channel.bulkDelete(1);
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const num: number = stringForNumber(
      commandSlash.options.getInteger('value'),
    );
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    const del = await channel.bulkDelete(num);
    if (del) {
      commandSlash.reply('Foi apagado ' + num);
      const time = await new Promise(f => setTimeout(f, 1000));
      channel.bulkDelete(1);
    }
    return commandSlash.reply({ embeds: [embedBuilder('', '')] });
  },
};

function stringForNumber(numberString: any) {
  const number: number = numberString;
  return number;
}
