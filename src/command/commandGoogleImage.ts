import { CommandInteraction, Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { googleImage } from '../../googleImage';
import { channelItsGuildTextChannel } from '../util/channelItsGuildTextChannel';

export const ime = {
  data: new SlashCommandBuilder()
    .setName('image')
    .setDescription('image')
    .addStringOption(option =>
      option.setName('text').setDescription('imagem').setRequired(true),
    ),
  async executeMessageCommand(commandMessage: Message) {
    const text = commandMessage.content.replace('*image ', '');
    if (text) {
      await sendSearch(text, commandMessage.channel, commandMessage);
    }
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const text = commandSlash.options.getString('text');
    if (text) {
      await sendSearch(text, commandSlash.channel, commandSlash);
    }
  },
};

async function sendSearch(
  text: string,
  channel: any,
  command: CommandInteraction | Message,
) {
  const channela = await channelItsGuildTextChannel(channel);
  if (channela) {
    const men = command.reply('Pesquisando ...').then(async () => {
      const id = channela.lastMessageId;
      if (id) {
        const mensage = await channela.messages.fetch(id);
        googleImage(text, channela, mensage);
      }
    });
  }
}
