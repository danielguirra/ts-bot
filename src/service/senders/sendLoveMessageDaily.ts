import { GuildTextBasedChannel } from 'discord.js';

import { googleImagePensador } from '../../../googleImage';
import { IPensador } from '../../interfaces/PensadorMessage';
import { pensador } from '../../util/pensador';
import { embedBuilder } from '../../util/getEmbed';
import { URL } from 'url';

export const sendLoveMessageDaily = async (
   channelLove?: GuildTextBasedChannel
) => {
   try {
      const data: IPensador = await pensador.getFromAmor();

      const url = new URL('https://www.google.com/search?q=' + data.author);

      const embed = embedBuilder(
         '💕 Por ' + data.author + ' 💕',
         data.message,
         undefined,
         data.author,
         undefined,
         undefined,
         'DarkVividPink',
         url.href
      );

      if (channelLove) {
         return await channelLove.send({ embeds: [embed] });
      }
      return embed;
   } catch (error) {
      console.log(error);
   }
};
