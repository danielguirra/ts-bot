import { createCanvas, loadImage } from 'canvas';
import {
   AttachmentBuilder,
   CommandInteraction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { loadin } from '../service/send/loadin';
import { senderSlash } from '../service/send/senderSlash';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { Command } from './Builder';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const itsfine: Command = {
   data: new SlashCommandBuilder()
      .setName('itsfine')
      .setDescription('está tudo ótimo')
      .addUserOption((option) =>
         option
            .setName('user')
            .setDescription('cidadão que está bem mesmo no inferno')
            .setRequired(true)
      ),
   async executeMessageCommand(commandMessage: Message) {
      const user = commandMessage.mentions.users.first();
      if (user) {
         const avatar = user.displayAvatarURL({ extension: 'png' });
         const image = await createCanvasItsFine(avatar);
         commandMessage.reply({ files: [image] });
      }
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const user = commandSlash.options.getUser('user');
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (user && channel) {
         return loadin(commandSlash)?.then(async () => {
            const avatar = user.displayAvatarURL({ extension: 'png' });
            const image = await createCanvasItsFine(avatar);
            if (image) {
               await senderSlash(channel, image, user);
            }
         });
      }
   },
};

async function createCanvasItsFine(avatar: string) {
   const canvas = createCanvas(640, 306);
   const context = canvas.getContext('2d');
   const background = await loadImage('https://i.imgur.com/hAXmSot.jpg');
   const avatarUser = await loadImage(avatar);
   context.drawImage(background, 0, 0, canvas.width, canvas.height);
   context.drawImage(avatarUser, 240, 70, 110, 110);
   const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'fine.png',
   });
   return attachment;
}
