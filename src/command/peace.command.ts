import { createCanvas, loadImage } from 'canvas';
import {
   AttachmentBuilder,
   CommandInteraction,
   GuildMember,
   Message,
   SlashCommandBuilder,
   User,
} from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';

export class PeaceCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('peace')
         .setDescription('retona uma imagem')
         .addUserOption((options) =>
            options
               .setName('target')
               .setDescription('cidadão')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const user = commandMessage.mentions.users.first();
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (user && channel) {
         const image = await this.getCanvasPeace(user);
         if (image) {
            await channel.send({ files: [image] });
         }
      }
   }

   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const user = commandSlash.options.getUser('target');
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (user && channel) {
         return loadinCreator(
            commandSlash,
            async () => {
               return await this.getCanvasPeace(user);
            },
            undefined
         );
      }
   }

   async getCanvasPeace(user: User | GuildMember) {
      const canvas = createCanvas(1000, 600);
      const context = canvas.getContext('2d');
      const background = await loadImage('https://i.imgur.com/NWdGKaF.png');

      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      const avatar = await loadImage(
         user.displayAvatarURL({ extension: 'png' })
      );
      context.drawImage(avatar, 690, 320, 230, 230);

      const attachment = new AttachmentBuilder(canvas.toBuffer(), {
         name: 'paz-image.png',
      });
      return attachment;
   }
}
