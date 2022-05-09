import { SlashCommandBuilder } from '@discordjs/builders';
import { createCanvas, loadImage } from 'canvas';
import { CommandInteraction, Message, MessageAttachment, User } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const grandedia = {
  data: new SlashCommandBuilder()
    .setName('grandedia')
    .setDescription('grandedia')
    .addUserOption(options =>
      options.setName('mito').setDescription('a lenda').setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.users.first();
    if (user) {
      const image = await createCanvasGrandeDia(user);
      return commandMessage.reply({ files: [image] });
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const user = commandSlash.options.getUser('user');

    if (user) {
      const image = await createCanvasGrandeDia(user);
      return commandSlash.reply({ files: [image] });
    }
  },
};

async function createCanvasGrandeDia(user: User) {
  const canvas = createCanvas(1186, 590);
  const context = canvas.getContext('2d');
  const background = await loadImage('https://i.im.ge/2021/09/24/TYiYOy.png');
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  context.drawImage(
    user.displayAvatarURL({ format: 'png' }),
    60,
    160,
    210,
    210,
  );
  context.font = '38px comic';
  context.fillText(`${user.tag}`, 280, 248);
  context.strokeText(`${user.tag}`, 280, 248);
  context.font = '28px comic';
  context.fillStyle = '#808080';
  context.strokeStyle = '#808080';
  context.fillText(`@${user.tag}oficial`, 280, 298);
  context.strokeText(`@${user.tag}oficial`, 280, 298);
  const attachment = new MessageAttachment(canvas.toBuffer(), 'day.png');
  return attachment;
}
