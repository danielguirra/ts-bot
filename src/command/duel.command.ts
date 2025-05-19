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

export class DuelCommand extends SlashCommandBuilder {
   constructor() {
      super();
      this.setName('duelo')
         .setDescription('é hora do duelo')
         .addUserOption((userOption) =>
            userOption
               .setName('target')
               .setDescription('o bocó')
               .setRequired(true)
         );
   }

   async executeMessageCommand(commandMessage: Message) {
      const challenged = commandMessage.mentions.users.first();
      const challenging = commandMessage.author;
      const channel = await channelItsGuildTextChannel(commandMessage.channel);
      if (channel) {
         const resul = await this.canvasDuel(challenging, challenged);
         if (resul) {
            await channel.send({ files: [resul] });
         }
      }
   }
   async executeSlashCommand(commandSlash: CommandInteraction) {
      if (!commandSlash.isChatInputCommand()) return;
      const challenged = commandSlash.options.getUser('target');
      const challenging = commandSlash.user;
      const channel = await channelItsGuildTextChannel(commandSlash.channel);
      if (channel && challenged) {
         return loadinCreator(
            commandSlash,
            async () => {
               return await this.canvasDuel(challenging, challenged);
            },
            undefined
         );
      }
   }

   async canvasDuel(user: User, user2: User | undefined | null) {
      const canvas = createCanvas(1980, 760);
      const context = canvas.getContext('2d');
      const background = await loadImage('./util/image/duelo.png');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      const user1 = await loadImage(
         user.displayAvatarURL({ extension: 'png' })
      );
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
}
