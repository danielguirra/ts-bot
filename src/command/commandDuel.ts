import { createCanvas, loadImage } from 'canvas';
import {
   AttachmentBuilder,
   CommandInteraction,
   Message,
   SlashCommandBuilder,
   User,
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
export const duel: Command = {
   data: new SlashCommandBuilder()
      .setName('duelo')
      .setDescription('é hora do duelo')
      .addUserOption((option) =>
         option.setName('target').setDescription('o bocó').setRequired(true)
      ),
   async executeMessageCommand(commandMessage: Message) {
      const user2 = commandMessage.mentions.users.first();
      const user = commandMessage.author;
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (channel) {
         const resul = await canvasDuel(user, user2);
         if (resul) {
            await channel.send({ files: [resul] });
         }
      }
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const user2 = commandSlash.options.getUser('target');
      const user = commandSlash.user;
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (channel && user2) {
         return loadin(commandSlash)?.then(async () => {
            const canvas = await canvasDuel(user, user2);
            if (canvas) {
               await senderSlash(channel, canvas, user2);
            }
         });
      }
   },
};

async function canvasDuel(user: User, user2: User | undefined | null) {
   const canvas = createCanvas(1980, 760);
   const context = canvas.getContext('2d');
   const background = await loadImage('./util/image/duelo.png');
   context.drawImage(background, 0, 0, canvas.width, canvas.height);
   const user1 = await loadImage(user.displayAvatarURL({ extension: 'png' }));
   context.drawImage(user1, 260, 200, 250, 250);
   if (!user2) return;
   const user2Image = await loadImage(
      user2.displayAvatarURL({ extension: 'png' })
   );
   context.drawImage(user2Image, 1460, 200, 250, 250);
   const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'duel.png',
   });

   return attachment;
}
