import { CommandInteraction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../util/getEmbed';

export class DiceCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('d20')
         .setDescription('rola um d20 ou um valor passado')
         .addIntegerOption((intergerOption) =>
            intergerOption
               .setName('value')
               .setDescription('valor a ser sorteado')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const num = parseInt(commandMessage.content.replace('*sorteio ', ''));
      if (num >= 2) {
         const resultado = this.sorteador(num);
         return commandMessage.reply(this.reply(resultado));
      }
      const resultado = this.sorteador(20);
      return commandMessage.reply(this.reply(resultado));
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const num = commandSlash.options.getInteger('value');
      if (num && num >= 2) {
         const resultado = this.sorteador(num);
         return commandSlash.reply(this.reply(resultado));
      }
      const resultado = this.sorteador(20);
      return commandSlash.reply(this.reply(resultado));
   }

   sorteador(num: number) {
      let dado = Math.floor(Math.random() * num);
      return dado + 1;
   }

   reply(resultado: number) {
      return {
         embeds: [embedBuilder('D20', `Seu valor foi:**${resultado}** `)],
      };
   }
}
