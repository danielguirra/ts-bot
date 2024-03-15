import { createCanvas, loadImage } from 'canvas';
import {
   AttachmentBuilder,
   CommandInteraction,
   GuildTextBasedChannel,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import * as fs from 'fs';
import { senderSlash } from '../service/senders/senderSlash';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';
import { Command } from './Builder';
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const fry: Command = {
   data: new SlashCommandBuilder()
      .setName('fry')
      .setDescription('fry futurama take my money')
      .addUserOption((options) =>
         options
            .setName('target')
            .setDescription('cidadão burgues')
            .setRequired(true)
      ),
   async executeMessageCommand(commandMessage: Message) {
      const user = commandMessage.mentions.users.first();
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (user && channel) {
         const canvas = await canvasCreatorFry(
            user.displayAvatarURL({ extension: 'png' }),
            channel
         );
      }
   },
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const user = commandSlash.options.getUser('target');
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (user && channel) {
         return loadinCreator(commandSlash, undefined, 'Carregando').then(
            async () => {
               const canvas = await canvasCreatorFry(
                  user.displayAvatarURL({ extension: 'png' })
               );
               if (canvas) {
                  await senderSlash(channel, canvas, user);
               }
            }
         );
      }
   },
};

async function canvasCreatorFry(
   avatarUrl: string,
   channel?: GuildTextBasedChannel
) {
   const canvas = createCanvas(768, 480);
   const context = canvas.getContext('2d');
   const backgroud = await loadImage(
      'https://ehacks.com.br/wp-content/uploads/167/17-shut-up-and-take-my-money-e1518817154986.jpg'
   );

   context.drawImage(backgroud, 0, 0, canvas.width, canvas.height);
   const user = await loadImage(avatarUrl);
   context.drawImage(user, 260, 170, 180, 180);

   fs.writeFileSync('image.jpg', canvas.toBuffer());
   const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'burgues.png',
   });

   if (!channel) return attachment;

   channel.send({ files: [attachment] });
}
