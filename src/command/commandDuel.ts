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
export const duel = {
  data: new SlashCommandBuilder()
    .setName('duelo')
    .setDescription('é hora do duelo')
    .addUserOption(option => option.setName('target').setDescription('o bocó')),
  async executeMessageCommand(commandMessage: Message) {
    const user2 = commandMessage.mentions.users.first();
    const user = commandMessage.author;
    const channel = await channelItsGuildTextChannel(commandMessage.channel);

    const resul = await canvasDuel(user, user2, channel);
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user2 = commandSlash.options.getUser('target');
    const user = commandSlash.user;
    const channel = await channelItsGuildTextChannel(commandSlash.channel);

    const sender = await loadinCreator(commandSlash, {
      channel,
      image: canvasDuel(user, user2, channel),
    });
  },
};

async function canvasDuel(
  user: User,
  user2: User | undefined | null,
  channel: GuildTextBasedChannel,
) {
  const canvas = createCanvas(1980, 760);
  const context = canvas.getContext('2d');
  const background = await loadImage('./Slash/util/image/duelo.png');
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  const user1 = await loadImage(user.displayAvatarURL({ extension: 'png' }));
  context.drawImage(user1, 260, 200, 250, 250);
  if (!user2) return;
  const user2Image = await loadImage(
    user2.displayAvatarURL({ extension: 'png' }),
  );
  context.drawImage(user2Image, 1460, 200, 250, 250);
  const attachment = new AttachmentBuilder(canvas.toBuffer(), {
    name: 'duel.png',
  });

  if (channel) channel.send({ files: [attachment] });
}
