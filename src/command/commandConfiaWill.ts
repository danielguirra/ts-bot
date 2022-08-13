import Canvas, { loadImage } from 'canvas';
import { AttachmentBuilder, Interaction, Message, SlashCommandBuilder, User } from 'discord.js';

import { loadin } from '../service/send/loadin';
import { senderSlash } from '../service/send/senderSlash';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

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
      option.setName('target').setDescription('cidadão').setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.users.first();

    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    if (user && channel) {
      const file = await confiaWillGetCanvas(user);
      if (file) {
        await channel.send({ files: [file] });
      }
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user = commandSlash.options.getUser('target');
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    if (user && channel && typeof user === 'object') {
      return loadin(commandSlash)?.then(async () => {
        const canvas = await confiaWillGetCanvas(user);
        if (canvas) {
          await senderSlash(channel, canvas, user);
        }
      });
    }
  },
};

async function confiaWillGetCanvas(user: User) {
  const canvas = Canvas.createCanvas(302, 167);
  const context = canvas.getContext('2d');
  const background = await Canvas.loadImage(
    'https://i.im.ge/2021/08/13/wuwi4.jpg',
  );
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  const avatar = await loadImage(user.displayAvatarURL({ extension: 'png' }));
  context.drawImage(avatar, 60, 30, 150, 90);

  const file = new AttachmentBuilder(canvas.toBuffer(), { name: 'confia.png' });

  return file;
}
