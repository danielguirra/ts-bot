import { SlashCommandBuilder } from '@discordjs/builders';
import Canvas from 'canvas';
import { CommandInteraction, Message, MessageAttachment } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const confiaWill = {
  data: new SlashCommandBuilder()
    .setName('confia')
    .setDescription('confia po')
    .addUserOption(option =>
      option.setName('target').setDescription('cidadão'),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.users.first()?.displayAvatarURL();
    if (user) {
      const file = await confiaWillGetCanvas(user);
      return commandMessage.reply({ files: [file] });
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const user = commandSlash.options.getUser('target')?.displayAvatarURL();
    if (user) {
      const file = await confiaWillGetCanvas(user);
      return commandSlash.reply({ files: [file] });
    }
  },
};

async function confiaWillGetCanvas(user: string) {
  const canvas = Canvas.createCanvas(302, 167);
  const context = canvas.getContext('2d');
  const background = await Canvas.loadImage(
    'https://i.im.ge/2021/08/13/wuwi4.jpg',
  );
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  const avatar = user;
  context.drawImage(avatar, 60, 30, 150, 90);

  const file = new MessageAttachment(canvas.toBuffer(), 'confia.png');

  return file;
}
