import axios from 'axios';
import cheerio from 'cheerio';
import { Interaction, Message, SlashCommandBuilder } from 'discord.js';

import { embedBuilder } from '../../src/util/getEmbed';

/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
export const joke = {
  data: new SlashCommandBuilder().setName('joke').setDescription('joke'),
  async executeMessageCommand(commandMessage: Message) {
    const embed = await getJoke();
    return commandMessage.reply({ embeds: [embed] });
  },
  async executeSlashCommand(commandSlash: Interaction) {
    if (!commandSlash.isChatInputCommand()) return;
    const embed = await getJoke();

    return commandSlash.reply({ embeds: [embed] });
  },
};

async function getJoke() {
  const logo =
    'https://www.piadasnet.com/imagens/Logotipos/LogotipoBoneco_peq.png';
  const url = 'https://www.piadasnet.com/piadas-curtas.htm';
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const $ = cheerio.load(response.data.toString('binary'));
  const text = $('p[class=piada]').text();
  return embedBuilder(
    'Piadas Curtas',
    text,
    logo,
    'PiadasNet',
    logo,
    undefined,
    'Yellow',
    url,
  );
}
