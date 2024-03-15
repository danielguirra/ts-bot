import axios from 'axios';
import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { Command } from './Builder';

const bibleUrl = process.env.URLBIBLE;
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const bibleverday: Command = {
   data: new SlashCommandBuilder()
      .setName('bibleverday')
      .setDescription('retorna um versiculo'),
   async executeMessageCommand(commandMessage: Message) {
      const ver = await axios.get(bibleUrl + '/arc/verdia');

      return commandMessage.reply({
         embeds: [
            embedBuilder(
               'Versiculo do Dia',
               ver.data,
               undefined,
               undefined,
               undefined,
               undefined,
               'Random'
            ),
         ],
      });
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const ver = await axios.get(bibleUrl + '/arc/verdia');
      return commandSlash.reply({
         embeds: [
            embedBuilder(
               'Versiculo do Dia',
               ver.data,
               undefined,
               undefined,
               undefined,
               undefined,
               'Random'
            ),
         ],
      });
   },
};
