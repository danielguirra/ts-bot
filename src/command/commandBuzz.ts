import { SlashCommandBuilder } from '@discordjs/builders';
import Canvas from 'canvas';
import { CommandInteraction, Message, MessageAttachment } from 'discord.js';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const buzz = {
  data: new SlashCommandBuilder()
    .setName('buzz')
    .setDescription('buzz ele é')
    .addUserOption(option =>
      option.setName('target').setDescription('cidadão').setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user1 = commandMessage.mentions.users.first()?.displayAvatarURL();
    const user2 = commandMessage.author.displayAvatarURL();

    if (user1 && user2) {
      const image = await buzzBuilder(user1, user2);
      return commandMessage.reply({ files: [image] });
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const user1 = commandSlash.options.getUser('target')?.displayAvatarURL();
    const user2 = commandSlash.user.displayAvatarURL();

    if (user1 && user2) {
      const image = await buzzBuilder(user1, user2);
      return commandSlash.reply({ files: [image] });
    }
  },
};

async function buzzBuilder(user1: string, user2: string) {
  const canvas = Canvas.createCanvas(500, 250);
  const context = canvas.getContext('2d');

  const buzz = await Canvas.loadImage('../../util/image/buzz.png');
  context.drawImage(buzz, 250, 0, 250, 255);
  const raibow = await Canvas.loadImage('../../util/image/arco.png');
  context.drawImage(raibow, 0, 0, 250, 250);
  context.drawImage(user1, 90, 130, 66, 66);
  context.drawImage(user2, 400, 18, 66, 66);

  const attachment = new MessageAttachment(canvas.toBuffer(), 'guei.png');

  return attachment;
}
