import Canvas, { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder, Interaction, Message, SlashCommandBuilder, TextBasedChannel } from 'discord.js';

import { loadinCreator } from '../util/loadin';

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
    const user1 = commandMessage.mentions.users
      .first()
      ?.displayAvatarURL({ extension: 'png' });
    const user2 = commandMessage.author.displayAvatarURL({ extension: 'png' });
    const channel = commandMessage.channel;

    if (user1 && user2) {
      const image = await buzzBuilder(user1, user2, channel);
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user1 = commandSlash.options
      .getUser('target')
      ?.displayAvatarURL({ extension: 'png' });
    const user2 = commandSlash.user.displayAvatarURL({ extension: 'png' });
    const channel = commandSlash.channel;
    if (user1 && user2) {
      const sender = await loadinCreator(commandSlash, {
        channel,
        image: buzzBuilder(user1, user2, channel),
      });
    }
  },
};

async function buzzBuilder(
  user1: string,
  user2: string,
  channel: TextBasedChannel | null,
) {
  const canvas = createCanvas(500, 250);
  const context = canvas.getContext('2d');

  const buzz = await loadImage('./util/image/buzz.png');
  context.drawImage(buzz, 250, 0, 250, 255);
  const raibow = await loadImage('./util/image/arco.png');

  context.drawImage(raibow, 0, 0, 250, 250);
  const user1Image = await loadImage(user1);
  context.drawImage(user1Image, 90, 130, 66, 66);
  const user2Image = await loadImage(user2);
  context.drawImage(user2Image, 400, 18, 66, 66);

  const attachment = new AttachmentBuilder(canvas.toBuffer(), {
    name: 'guei.png',
  });
  if (!channel) return;
  return channel.send({ files: [attachment] });
}
