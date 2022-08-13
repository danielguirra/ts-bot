import { createCanvas, loadImage } from 'canvas';
import { AttachmentBuilder, GuildMember, Interaction, Message, SlashCommandBuilder, User } from 'discord.js';

import { loadin } from '../service/send/loadin';
import { senderSlash } from '../service/send/senderSlash';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

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
    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    if (user && channel) {
      const avatar = await getCanvasPdl(user);
      if (avatar) {
        await channel.send({ files: [avatar] });
      }
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const user = commandSlash.options.getUser('target');
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    if (user && channel) {
      return loadin(commandSlash)?.then(async () => {
        const canvas = await getCanvasPdl(user);
        if (canvas) {
          await senderSlash(channel, canvas, user);
        }
      });
    }
  },
};

async function getCanvasPdl(user: GuildMember | User) {
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

  return attachment;
}
