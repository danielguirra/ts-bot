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
export const pdl = {
  data: new SlashCommandBuilder()
    .setName('pdl')
    .setDescription('pdlzada bora')
    .addUserOption(options =>
      options.setName('target').setDescription('cidadão').setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.members?.first();
    if (user) {
      const avatar = await getCanvasPdl(
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
        image: getCanvasPdl(user, channel),
      });
    }
  },
};

async function getCanvasPdl(
  user: GuildMember | User,
  channel?: GuildTextBasedChannel,
) {
  const canvas = createCanvas(720, 681);
  const context = canvas.getContext('2d');
  const background = await loadImage('./util/image/pdl.jpg');
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  let avatar;
  try {
    avatar = await loadImage(user.displayAvatarURL({ extension: 'png' }));
  } catch (error) {
    return;
  }
  context.drawImage(avatar, 240, 70, 230, 230);
  const attachment = new AttachmentBuilder(canvas.toBuffer(), {
    name: 'fine.png',
  });

  if (!channel) return attachment;

  return channel.send({ files: [attachment] });
}
