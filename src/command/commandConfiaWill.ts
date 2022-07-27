import Canvas, { loadImage } from 'canvas';
import { AttachmentBuilder, GuildTextBasedChannel, Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
import { loadinCreator } from '../util/loadin';

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
    const user = commandMessage.mentions.users
      .first()
      ?.displayAvatarURL({ extension: 'png' });
    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    if (user) {
      const file = await confiaWillGetCanvas(user, channel);
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user = commandSlash.options
      .getUser('target')
      ?.displayAvatarURL({ extension: 'png' });
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    if (user) {
      const sender = await loadinCreator(commandSlash, {
        channel,
        image: confiaWillGetCanvas(user, channel),
      });
    }
  },
};

async function confiaWillGetCanvas(
  user: string,
  channel: GuildTextBasedChannel,
) {
  const canvas = Canvas.createCanvas(302, 167);
  const context = canvas.getContext('2d');
  const background = await Canvas.loadImage(
    'https://i.im.ge/2021/08/13/wuwi4.jpg',
  );
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  const avatar = await loadImage(user);
  context.drawImage(avatar, 60, 30, 150, 90);

  const file = new AttachmentBuilder(canvas.toBuffer(), { name: 'confia.png' });

  return channel.send({ files: [file] });
}
