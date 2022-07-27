import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const dice = {
  data: new SlashCommandBuilder()
    .setName('d20')
    .setDescription('rola um d20 ou um valor passado')
    .addIntegerOption(options =>
      options.setName('value').setDescription('valor a ser sorteado'),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const num: any = commandMessage.content.replace('*sorteio ', '');
    if (num >= 2) {
      const resultado = sorteador(num);
      return commandMessage.reply({
        embeds: [embedBuilder('D20', `Seu valor foi:**${resultado}** `)],
      });
    } else {
      const resultado = sorteador(20);
      return commandMessage.reply({
        embeds: [embedBuilder('D20', `Seu valor foi:**${resultado}** `)],
      });
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const num: any = commandSlash.options.get('value');
    if (num >= 2) {
      const resultado = sorteador(num);
      return commandSlash.reply({
        embeds: [embedBuilder('D20', `Seu valor foi:**${resultado}** `)],
      });
    } else {
      const resultado = sorteador(20);
      return commandSlash.reply({
        embeds: [embedBuilder('D20', `Seu valor foi:**${resultado}** `)],
      });
    }
  },
};

function sorteador(num: number) {
  let dado = Math.floor(Math.random() * num);
  return dado + 1;
}
