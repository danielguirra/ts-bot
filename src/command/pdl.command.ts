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

export class PdlCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('pdl')
         .setDescription('pdlzada bora')
         .addUserOption((options) =>
            options
               .setName('target')
               .setDescription('cidadão')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const user = commandMessage.mentions.members?.first();
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (user && channel) {
         const avatar = await this.getCanvasPdl(user);
         if (avatar) {
            await channel.send({ files: [avatar] });
         }
      }
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const user = commandSlash.options.getUser('target');
      if (user) {
         return await loadinCreator(
            commandSlash,
            async () => {
               return await this.getCanvasPdl(user);
            },
            undefined
         );
      }
   }

   async getCanvasPdl(user: GuildMember | User) {
      const canvas = createCanvas(720, 681);
      const context = canvas.getContext('2d');
      const background = await loadImage('./util/image/pdl.jpg');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      let avatar;
      try {
         avatar = await loadImage(user.displayAvatarURL({ extension: 'png' }));
      } catch (error) {
         return;
      }
      context.drawImage(avatar, 240, 70, 230, 230);
      const attachment = new AttachmentBuilder(canvas.toBuffer(), {
         name: 'fine.png',
      });

      return attachment;
   }
}
