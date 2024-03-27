import { ChannelType, Message, SlashCommandBuilder } from 'discord.js';

import { pensador } from '../util/pensador';
import { Command } from '../interfaces/Command';
import { googleImage } from '../util/googleImage';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { embedBuilder } from '../util/getEmbed';

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
      const data = await pensador.getFromMotivacionais();
      if (data) {
         commandMessage.reply('Carregando').then(async (Interaction) => {
            if (commandMessage.channel.type == ChannelType.GuildText) {
               const image = await googleImage(data.author);

               if (typeof image == 'string') {
                  const url = new URL(
                     'https://www.google.com/search?q=' + data.author
                  );

                  const embed = embedBuilder(
                     'Motivacional Por ' + data.author + ' 🤯',
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
      const data = await pensador.getFromMotivacionais();
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
                     'Motivacional Por ' + data.author + ' 🤯',
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

const embedAux = {
   embedTitle: 'Messagem Motivacional',
};
