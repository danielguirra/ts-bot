import { createCanvas, loadImage } from 'canvas';
import {
   AttachmentBuilder,
   CommandInteraction,
   Message,
   SlashCommandBuilder,
   User,
} from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';
import { Command } from './Builder';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const grandedia: Command = {
   data: new SlashCommandBuilder()
      .setName('grandedia')
      .setDescription('grandedia')
      .addUserOption((options) =>
         options.setName('mito').setDescription('a lenda').setRequired(true)
      ),
   async executeMessageCommand(commandMessage: Message) {
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      const user = commandMessage.mentions.users.first();
      if (user && channel) {
         const image = await createCanvasGrandeDia(user);
         if (image) {
            await channel.send({ files: [image] });
         }
      }
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const user = commandSlash.options.getUser('mito');
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (user && channel) {
         return loadinCreator(
            commandSlash,
            async () => {
               return await createCanvasGrandeDia(user);
            },
            undefined
         );
      }
   },
};

async function createCanvasGrandeDia(user: User) {
   const canvas = createCanvas(1186, 590);
   const context = canvas.getContext('2d');
   const background = await loadImage('./util/image/grande.png');
   context.drawImage(background, 0, 0, canvas.width, canvas.height);
   const userImage = await loadImage(
      user.displayAvatarURL({ extension: 'png' })
   );
   context.drawImage(userImage, 60, 160, 210, 210);
   context.font = '38px comic';
   context.fillText(`${user.username}`, 280, 248);
   context.strokeText(`${user.username}`, 280, 248);
   context.font = '28px comic';
   context.fillStyle = '#808080';
   context.strokeStyle = '#808080';
   context.fillText(`@${user.username} Oficial`, 280, 298);
   context.strokeText(`@${user.username} Oficial`, 280, 298);
   const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'dia.png',
   });
   return attachment;
}
