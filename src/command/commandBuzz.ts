import { SlashCommandBuilder } from '@discordjs/builders';
import Canvas, { createCanvas, loadImage } from 'canvas';
import { CommandInteraction, GuildTextBasedChannel, Message, MessageAttachment } from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';
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
    const user1 = commandMessage.mentions.users.first()?.displayAvatarURL();
    const user2 = commandMessage.author.displayAvatarURL();
    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    if (user1 && user2) {
      const image = await buzzBuilder(user1, user2, channel);
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const user1 = commandSlash.options.getUser('target')?.displayAvatarURL();
    const user2 = commandSlash.user.displayAvatarURL();
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
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
  channel: GuildTextBasedChannel,
) {
  const canvas = createCanvas(500, 250);
  const context = canvas.getContext('2d');

  const buzz = await loadImage('./util/image/buzz.png');
  context.drawImage(buzz, 250, 0, 250, 255);
  const raibow = await loadImage('./util/image/arco.png');
  context.drawImage(raibow, 0, 0, 250, 250);
  context.drawImage(user1, 90, 130, 66, 66);
  context.drawImage(user2, 400, 18, 66, 66);

  const attachment = new MessageAttachment(canvas.toBuffer(), 'guei.png');

  return channel.send({ files: [attachment] });
}
