import { Message, SlashCommandBuilder } from 'discord.js';

import { googleImagePensador } from '../util/googleImage';
import { pensador } from '../util/pensador';
import { Command } from '../interfaces/Command';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const motivacao: Command = {
   data: new SlashCommandBuilder()
      .setName('motivacao')
      .setDescription('motivacao uma mensagem motivacional será enviada'),
   async executeMessageCommand(commandMessage: Message) {
      const motivacaoFunc = await pensador.getFromMotivacionais();
      if (motivacaoFunc) {
         const embed = await googleImagePensador(
            embedAux,
            motivacaoFunc,
            commandMessage
         );
      }
   },
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const motivacaoFunc = await pensador.getFromMotivacionais();
      if (motivacaoFunc) {
         const embed = await googleImagePensador(
            embedAux,
            motivacaoFunc,
            commandSlash
         );
      }
   },
};

const embedAux = {
   embedTitle: 'Messagem Motivacional',
};
