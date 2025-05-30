import { createCanvas, loadImage } from 'canvas';
import {
   AttachmentBuilder,
   CommandInteraction,
   Interaction,
   Message,
   SlashCommandBuilder,
} from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';

export class BuzzCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('buzz')
         .setDescription('buzz ele é')
         .addUserOption((userOption) =>
            userOption
               .setName('target')
               .setDescription('cidadão')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const user1 = commandMessage.mentions.users
         .first()
         ?.displayAvatarURL({ extension: 'png' });
      const user2 = commandMessage.author.displayAvatarURL({
         extension: 'png',
      });
      const channel = commandMessage.channel;

      if (user1 && user2) {
         const image = await this.buzzImageCanvasBuilder(user1, user2);
         if (image) {
            await channel.send({ files: [image] });
         }
      }

      return;
   }
   async executeSlashCommand(commandSlash: CommandInteraction | Interaction) {
      if (!commandSlash.isChatInputCommand()) return;
      const user1 = commandSlash.options
         .getUser('target')
         ?.displayAvatarURL({ extension: 'png' });
      const user2 = commandSlash.user.displayAvatarURL({ extension: 'png' });
      const user = commandSlash.options.getUser('target');
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (user1 && user2 && channel && user) {
         return loadinCreator(
            commandSlash,
            async () => {
               return await this.buzzImageCanvasBuilder(user1, user2);
            },
            undefined
         );
      }

      return;
   }

   async buzzImageCanvasBuilder(user1: string, user2: string) {
      const canvas = createCanvas(500, 250);
      const context = canvas.getContext('2d');

      const buzzImage = await loadImage('./util/image/buzz.png');
      context.drawImage(buzzImage, 250, 0, 250, 255);
      const raibowImage = await loadImage('./util/image/arco.png');

      context.drawImage(raibowImage, 0, 0, 250, 250);
      const user1Image = await loadImage(user1);
      context.drawImage(user1Image, 90, 130, 66, 66);
      const user2Image = await loadImage(user2);
      context.drawImage(user2Image, 400, 18, 66, 66);

      const attachment = new AttachmentBuilder(canvas.toBuffer(), {
         name: 'guei.png',
      });
      return attachment;
   }
}
