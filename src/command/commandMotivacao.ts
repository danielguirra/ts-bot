import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Message } from 'discord.js';

import { googleImagePensador } from '../../googleImage';
import { pensador } from '../util/pensador';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const motivacao = {
  data: new SlashCommandBuilder()
    .setName('motivacao')
    .setDescription('motivacao uma mensagem motivacional será enviada'),
  async executeMessageCommand(commandMessage: Message) {
    const motivacaoFunc = await pensador.getFromMotivacionais();
    if (motivacaoFunc) {
      const embed = await googleImagePensador(
        embedAux,
        motivacaoFunc,
        commandMessage,
      );
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const motivacaoFunc = await pensador.getFromMotivacionais();
    if (motivacaoFunc) {
      const embed = await googleImagePensador(
        embedAux,
        motivacaoFunc,
        commandSlash,
      );
    }
  },
};

const embedAux = {
  embedTitle: 'Messagem Motivacional',
};
