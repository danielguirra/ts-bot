import axios from 'axios';
import { GuildTextBasedChannel } from 'discord.js';

import { embedBuilder } from '../../util/getEmbed';

export const sendDolarDaily = async (
  channelDolar: GuildTextBasedChannel,
  commandEmbed?: boolean,
) => {
  try {
    if (commandEmbed) {
      const data = await axios.get(
        `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL`,
      );
      const moeda = data.data;
      const dolar = moeda['USDBRL']['ask'];
      const euro = moeda['EURBRL']['ask'];

      return {
        embeds: [
          embedBuilder(
            'Dolar e Euro Atual',
            `   1 Dolar em R$:${dolar}💵
	                1 Euro em R$:${euro}💶
	      `,
          ),
        ],
      };
    } else {
      const data = await axios.get(
        `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL`,
      );
      const moeda = data.data;
      const dolar = moeda['USDBRL']['ask'];
      const euro = moeda['EURBRL']['ask'];

      channelDolar.send({
        embeds: [
          embedBuilder(
            'Dolar e Euro Atual',
            `   1 Dolar em R$:${dolar}💵
	                1 Euro em R$:${euro}💶
	      `,
          ),
        ],
      });
    }
  } catch (error) {
    console.log(error)
  }
};
