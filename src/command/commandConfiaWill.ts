import Canvas, { loadImage } from 'canvas';
import {
   AttachmentBuilder,
   Message,
   SlashCommandBuilder,
   User,
} from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';
import { Command } from '../interfaces/Command';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const confiaWill: Command = {
   data: new SlashCommandBuilder()
      .setName('confia')
      .setDescription('confia po')
      .addUserOption((option) =>
         option.setName('target').setDescription('cidadão').setRequired(true)
      ),
   async executeMessageCommand(commandMessage: Message) {
      const user = commandMessage.mentions.users.first();

      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (user && channel) {
         const file = await confiaWillGetCanvas(user);
         if (file) {
            await channel.send({ files: [file] });
         }
      }
   },
   async executeSlashCommand(commandSlash) {
      if (!commandSlash.isChatInputCommand()) return;
      const user = commandSlash.options.getUser('target');
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (user && channel && typeof user === 'object') {
         return loadinCreator(
            commandSlash,
            async () => {
               return await confiaWillGetCanvas(user);
            },
            undefined
         );
      }
   },
};

async function confiaWillGetCanvas(user: User) {
   const canvas = Canvas.createCanvas(302, 167);
   const context = canvas.getContext('2d');
   const background = await Canvas.loadImage(
      'https://i.im.ge/2021/08/13/wuwi4.jpg'
   );
   context.drawImage(background, 0, 0, canvas.width, canvas.height);
   const avatar = await loadImage(user.displayAvatarURL({ extension: 'png' }));
   context.drawImage(avatar, 60, 30, 150, 90);

   const file = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'confia.png',
   });

   return file;
}
