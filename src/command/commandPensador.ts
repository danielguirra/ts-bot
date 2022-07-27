import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

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
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const soltas = await uga.getFromSoltas();
    if (soltas) {
      const embed = await googleImagePensador(embedAux, soltas, commandSlash);
    }
  },
};

const embedAux = {
  embedTitle: 'Pensador Frases Soltas',
};
