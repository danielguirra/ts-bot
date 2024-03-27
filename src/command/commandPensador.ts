import { ChannelType, Message, SlashCommandBuilder } from 'discord.js';

import { pensador as uga } from '../util/pensador';
import { Command } from '../interfaces/Command';
import { embedBuilder } from '../util/getEmbed';
import { googleImage } from '../util/googleImage';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const pensador: Command = {
   data: new SlashCommandBuilder()
      .setName('pensador')
      .setDescription('pensador'),
   async executeMessageCommand(commandMessage: Message) {
      const data = await uga.getFromSoltas();
      if (data) {
         commandMessage.reply('Carregando').then(async (Interaction) => {
            if (
               commandMessage.channel &&
               commandMessage.channel.type == ChannelType.GuildText
            ) {
               const image = await googleImage(data.author);

               if (typeof image == 'string') {
                  const url = new URL(
                     'https://www.google.com/search?q=' + data.author
                  );

                  const embed = embedBuilder(
                     'Soltas Por ' + data.author + ' 🤯',
                     data.message,
                     image,
                     data.author,
                     image,
                     undefined,
                     'Random',
                     url.href
                  );
                  await Interaction.edit({ embeds: [embed] });
               }
            }
         });
      }
   },
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const data = await uga.getFromSoltas();
      if (data) {
         commandSlash.reply('Carregando').then(async (Interaction) => {
            if (
               commandSlash.channel &&
               commandSlash.channel.type == ChannelType.GuildText
            ) {
               const image = await googleImage(data.author);

               if (typeof image == 'string') {
                  const url = new URL(
                     'https://www.google.com/search?q=' + data.author
                  );

                  const embed = embedBuilder(
                     'Soltas Por ' + data.author + ' 🤯',
                     data.message,
                     image,
                     data.author,
                     image,
                     undefined,
                     'Random',
                     url.href
                  );
                  await Interaction.edit({ embeds: [embed] });
               }
            }
         });
      }
   },
};
