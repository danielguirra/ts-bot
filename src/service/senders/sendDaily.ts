import { GuildTextBasedChannel } from 'discord.js';

import { IPensador } from '../../interfaces/PensadorMessage';
import { pensador } from '../../util/pensador';
import { embedBuilder } from '../../util/getEmbed';

export const sendDaily = async (channelDaily: GuildTextBasedChannel) => {
   try {
      const data: IPensador = await pensador.getFromMotivacionais();
      const url = new URL('https://www.google.com/search?q=' + data.author);

      const embed = embedBuilder(
         'Motivacional Por ' + data.author + ' 🤯',
         data.message,
         undefined,
         data.author,
         undefined,
         undefined,
         'Random',
         url.href
      );

      if (channelDaily) {
         return await channelDaily.send({ embeds: [embed] });
      }
      return embed;
   } catch (error) {
      console.log(error);
   }
};
