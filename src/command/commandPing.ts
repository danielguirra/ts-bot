import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../util/getEmbed';

export const ping = {
  data: new SlashCommandBuilder()
    .setName('ts')
    .setDescription('teste tyscript slash')
    .addStringOption(options =>
      options.setName('teste').setDescription('bananasplit'),
    ),
  async executeSlashCommand(commandSlash: CommandInteraction): Promise<any> {
    const result: string = commandSlash.options.getString('teste') || '';
    return commandSlash.reply({ embeds: [embedBuilder('TypeScript', result)] });
  },
  async executeMessageCommand(commandMessage: Message) {
    const result: string = commandMessage.content.replace('*ts ', ' ');
    return commandMessage.reply({
      embeds: [embedBuilder('TypeScript', result)],
    });
  },
};
