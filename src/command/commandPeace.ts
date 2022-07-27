import { createCanvas, loadImage } from 'canvas';
import {
  AttachmentBuilder,
  GuildMember,
  GuildTextBasedChannel,
  Interaction,
  Message,
  SlashCommandBuilder,
  User,
} from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const peace = {
  data: new SlashCommandBuilder()
    .setName('peace')
    .setDescription('retona uma imagem')
    .addUserOption(options =>
      options.setName('target').setDescription('cidadão').setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.users.first();
    if (user) {
      const image = await getCanvasPeace(
        user,
        await channelItsGuildTextChannel(commandMessage.channel),
      );
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user = commandSlash.options.getUser('target');
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    if (user) {
      const sender = await loadinCreator(commandSlash, {
        channel,
        image: getCanvasPeace(user, channel),
      });
    }
  },
};

async function getCanvasPeace(
  user: User | GuildMember,
  channel?: GuildTextBasedChannel,
) {
  const canvas = createCanvas(1000, 600);
  const context = canvas.getContext('2d');
  const background = await loadImage('https://i.im.ge/2021/09/24/T3b3qM.png');

  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await loadImage(user.displayAvatarURL({ extension: 'png' }));
  context.drawImage(avatar, 690, 320, 230, 230);

  const attachment = new AttachmentBuilder(canvas.toBuffer(), {
    name: 'paz-image.png',
  });
  if (!channel) return;

  return channel.send({ files: [attachment] });
}
