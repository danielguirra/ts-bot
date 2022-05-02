import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../util/getEmbed';
import { getImage } from '../util/getImage';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
//  */
export const ime = {
  data: new SlashCommandBuilder()
    .setName('ime')
    .setDescription('ime asdasdasd')
    .addStringOption(option => option.setName('text').setDescription('imagem')),
  async executeMessageCommand(commandMessage: Message) {
    const text = commandMessage.content.replace('*ime ', '');
    const image = await getImage(text);

    return commandMessage.reply(image);
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const text = commandSlash.options.getString('text');
    if (text) {
      const image = await getImage(text);
      return commandSlash.reply(image);
    }

    return commandSlash.reply({ embeds: [embedBuilder('', '')] });
  },
};
