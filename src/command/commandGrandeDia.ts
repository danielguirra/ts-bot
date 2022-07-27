import { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder, GuildTextBasedChannel, Interaction, Message, SlashCommandBuilder, User } from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';

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
    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    const user = commandMessage.mentions.users.first();
    if (user) {
      const image = await createCanvasGrandeDia(user, channel);
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user = commandSlash.options.getUser('user');
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    if (user) {
      const sender = await loadinCreator(commandSlash, {
        channel,
        image: createCanvasGrandeDia(user, channel),
      });
    }
  },
};

async function createCanvasGrandeDia(
  user: User,
  channel?: GuildTextBasedChannel,
) {
  const canvas = createCanvas(1186, 590);
  const context = canvas.getContext('2d');
  const background = await loadImage('https://i.im.ge/2021/09/24/TYiYOy.png');
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  const userImage = await loadImage(
    user.displayAvatarURL({ extension: 'png' }),
  );
  context.drawImage(userImage, 60, 160, 210, 210);
  context.font = '38px comic';
  context.fillText(`${user.tag}`, 280, 248);
  context.strokeText(`${user.tag}`, 280, 248);
  context.font = '28px comic';
  context.fillStyle = '#808080';
  context.strokeStyle = '#808080';
  context.fillText(`@${user.tag}oficial`, 280, 298);
  context.strokeText(`@${user.tag}oficial`, 280, 298);
  const attachment = new AttachmentBuilder(canvas.toBuffer(), {
    name: 'dia.png',
  });
  if (!channel) return attachment;

  channel.send({ files: [attachment] });
}
