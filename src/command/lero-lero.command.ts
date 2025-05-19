import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../util/getEmbed';
import { getLeroLero } from '../util/lerolero';

export class LeroleroCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('lerolero').setDescription('lerolero');
   }

   async executeMessageCommand(commandMessage: Message) {
      return commandMessage.reply({ embeds: this.embed(getLeroLero()).embeds });
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      return commandSlash.reply({ embeds: this.embed(getLeroLero()).embeds });
   }

   embed = (lero: string) => {
      return {
         embeds: [
            embedBuilder(
               'Lero Lero',
               lero,
               'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK_-Az0lr-qqNiYwQQmqVd4_suO63-BTKFZyL8IqZRjweIJuaPgerkP3FrWssLVZpNPs&usqp=CAU',
               'Ovelha',
               'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK_-Az0lr-qqNiYwQQmqVd4_suO63-BTKFZyL8IqZRjweIJuaPgerkP3FrWssLVZpNPs&usqp=CAU',
               undefined,
               '#ffffff',
               undefined
            ),
         ],
      };
   };
}
