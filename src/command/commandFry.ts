import { SlashCommandBuilder } from '@discordjs/builders';
import { createCanvas, loadImage } from 'canvas';
import { CommandInteraction, Message, MessageAttachment } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const fry = {
  data: new SlashCommandBuilder()
    .setName('fry')
    .setDescription('fry futurama take my money')
    .addUserOption(options =>
      options.setName('target').setDescription('cidadão burgues'),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.users.first();

    if (user) {
      const canvas = await canvasCreatorFry(user.displayAvatarURL());
      return commandMessage.reply({ files: [canvas] });
    } else {
      const canvas = await canvasCreatorFry(
        commandMessage.author.displayAvatarURL(),
      );
      return commandMessage.reply({ files: [canvas] });
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    if (commandSlash.options.getUser('target')) {
      const user = commandSlash.options.getUser('target');
      if (user) {
        const canvas = await canvasCreatorFry(user.displayAvatarURL());
        return commandSlash.reply({ files: [canvas] });
      } else {
        const canvas = await canvasCreatorFry(
          commandSlash.user.displayAvatarURL(),
        );
        return commandSlash.reply({ files: [canvas] });
      }
    }
  },
};

async function canvasCreatorFry(avatarUrl: string) {
  const canvas = createCanvas(768, 480);
  const context = canvas.getContext('2d');
  const backgroud = await loadImage(
    'https://ehacks.com.br/wp-content/uploads/167/17-shut-up-and-take-my-money-e1518817154986.jpg',
  );

  context.drawImage(backgroud, 0, 0, canvas.width, canvas.height);

  context.drawImage(avatarUrl, 260, 170, 180, 180);

  const attachment = new MessageAttachment(canvas.toBuffer(), 'burgues.png');

  return attachment;
}
