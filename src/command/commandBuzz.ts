import Canvas, { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder, Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { loadin } from '../service/send/loadin';
import { senderSlash } from '../service/send/senderSlash';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

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
      const image = await buzzImageCanvasBuilder(user1, user2);
      if (image) {
        await channel.send({ files: [image] });
      }
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user1 = commandSlash.options
      .getUser('target')
      ?.displayAvatarURL({ extension: 'png' });
    const user2 = commandSlash.user.displayAvatarURL({ extension: 'png' });
    const user = commandSlash.options.getUser('target');
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    if (user1 && user2 && channel && user) {
      return loadin(commandSlash)?.then(async () => {
        const canvas = await buzzImageCanvasBuilder(user1, user2);
        if (canvas) {
          await senderSlash(channel, canvas, user);
        }
      });
    }
  },
};

async function buzzImageCanvasBuilder(user1: string, user2: string) {
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
