import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Interaction, Message } from 'discord.js';

export const climate = {
  data: new SlashCommandBuilder()
    .setName('clima')
    .setDescription('retorna o clima da cidade informada somente do brasil')
    .addStringOption(option =>
      option.setName('cidade').setDescription('cidade a ser retornada o clima'),
    ),
  async execute(command: Message | CommandInteraction | Interaction) {
    let city: string;
    if (command.type === 'DEFAULT') {
      city = command.content.replace('*clima ', ' ');
    }
    if (command.type === 'APPLICATION_COMMAND') {
    }
  },
};
