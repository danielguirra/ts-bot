import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { CommandInteraction, Message } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';
import { translateText } from '../util/translate';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const advice = {
  data: new SlashCommandBuilder()
    .setName('conselho')
    .setDescription('Conselho aletório'),
  async executeMessageCommand(commandMessage: Message) {
    const avatar = commandMessage.author.displayAvatarURL();
    const tag = commandMessage.author.username;
    const advice = await getAdvice();

    return commandMessage.reply({
      embeds: [embedBuilder('Conselho', advice, avatar, tag)],
    });
  },
  async executeSlashCommand(commandSlash: CommandInteraction) {
    const avatar = commandSlash.user.displayAvatarURL();
    const tag = commandSlash.user.username;
    const advice = await getAdvice();

    return commandSlash.reply({
      embeds: [embedBuilder('Conselho', advice, avatar, tag)],
    });
  },
};

async function getAdvice() {
  const url = `https://api.adviceslip.com/advice`;
  const advice = await axios.get(url);
  const text = advice.data.slip.advice;
  const result: any = (await translateText(text)).text || '';
  return result;
}
