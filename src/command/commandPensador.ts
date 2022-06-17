import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { googleImagePensador } from '../../googleImage';
import { pensador as uga } from '../util/pensador';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const pensador = {
  data: new SlashCommandBuilder()
    .setName('pensador')
    .setDescription('pensador'),
  async executeMessageCommand(commandMessage: Message) {
    const soltas = await uga.getFromSoltas();
    if (soltas) {
      const embed = await googleImagePensador(embedAux, soltas, commandMessage);
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const soltas = await uga.getFromSoltas();
    if (soltas) {
      const embed = await googleImagePensador(embedAux, soltas, commandSlash);
    }
  },
};

const embedAux = {
  embedTitle: 'Pensador Frases Soltas',
};
