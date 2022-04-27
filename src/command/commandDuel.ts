import { SlashCommandBuilder } from '@discordjs/builders';
import { createCanvas, loadImage } from 'canvas';
import { CommandInteraction, Message, MessageAttachment, User } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const duel = {
  data: new SlashCommandBuilder()
    .setName('duelo')
    .setDescription('é hora do duelo')
    .addUserOption(option => option.setName('target').setDescription('o bocó')),
  async executeMessageCommand(commandMessage: Message) {
    const user2 = commandMessage.mentions.users.first();
    const user = commandMessage.author;

    const resul = await canvasDuel(user, user2);

    return commandMessage.reply({ files: [resul] });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const user2 = commandSlash.options.getUser('target');
    const user = commandSlash.user;

    const resul = await canvasDuel(user, user2);

    return commandSlash.reply({ files: [resul] });
  },
};

async function canvasDuel(user: User, user2: User | undefined | null) {
  const canvas = createCanvas(1980, 760);
  const context = canvas.getContext('2d');
  const background = await loadImage('./Slash/util/image/duelo.png');
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  context.drawImage(
    user.displayAvatarURL({ format: 'png' }),
    260,
    200,
    250,
    250,
  );
  context.drawImage(
    user2?.displayAvatarURL({ format: 'png' }),
    1460,
    200,
    250,
    250,
  );
  const attachment = new MessageAttachment(canvas.toBuffer(), 'duel.png');

  return attachment;
}
