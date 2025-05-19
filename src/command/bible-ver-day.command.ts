import axios from 'axios';
import {
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { embedBuilder } from '../util/getEmbed';

export class BibleVerseDayCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('bibleverday').setDescription('retorna um versiculo');
   }

   private bibleUrl = process.env.URLBIBLE;
   async executeMessageCommand(commandMessage: Message) {
      try {
         const ver = await axios.get(this.bibleUrl + '/arc/verdia');

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
      } catch (error) {
         return commandMessage.reply('Não Deu amigo');
      }
   }
   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      try {
         const ver = await axios.get(this.bibleUrl + '/arc/verdia');
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
      } catch (error) {
         return commandSlash.reply('Não rolou');
      }
   }
}
