import { SlashCommandBuilder } from '@discordjs/builders';
import { createCanvas, loadImage } from 'canvas';
import { CommandInteraction, GuildTextBasedChannel, Message, MessageAttachment } from 'discord.js';

import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const fry = {
  data: new SlashCommandBuilder()
    .setName('fry')
    .setDescription('fry futurama take my money')
    .addUserOption(options =>
      options.setName('target').setDescription('cidadão burgues'),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const user = commandMessage.mentions.users.first();
    const channel = await channelItsGuildTextChannel(commandMessage.channel);
    if (user) {
      const canvas = await canvasCreatorFry(user.displayAvatarURL(), channel);
    }
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const user = commandSlash.options.getUser('target');
    const channel = await channelItsGuildTextChannel(commandSlash.channel);
    if (user) {
      commandSlash.reply('Carregando ...').then(async () => {
        const canvas = await canvasCreatorFry(user.displayAvatarURL(), channel);
      });
    }
  },
};

async function canvasCreatorFry(
  avatarUrl: string,
  channel?: GuildTextBasedChannel,
) {
  const canvas = createCanvas(768, 480);
  const context = canvas.getContext('2d');
  const backgroud = await loadImage(
    'https://ehacks.com.br/wp-content/uploads/167/17-shut-up-and-take-my-money-e1518817154986.jpg',
  );

  context.drawImage(backgroud, 0, 0, canvas.width, canvas.height);

  context.drawImage(avatarUrl, 260, 170, 180, 180);

  const attachment = new MessageAttachment(canvas.toBuffer(), 'burgues.png');

  if (!channel) return attachment;

  channel.send({ files: [attachment] });
}
