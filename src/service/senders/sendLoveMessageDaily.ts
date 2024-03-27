import { GuildTextBasedChannel } from 'discord.js';

import { IPensador } from '../../interfaces/PensadorMessage';
import { pensador } from '../../util/pensador';
import { embedBuilder } from '../../util/getEmbed';
import { URL } from 'url';
import { googleImage } from '../../util/googleImage';

export const sendLoveMessageDaily = async (
   channelLove?: GuildTextBasedChannel
) => {
   try {
      const data: IPensador = await pensador.getFromAmor();

      const url = new URL('https://www.google.com/search?q=' + data.author);
      const image = (await googleImage(data.author)) as string;
      const embed = embedBuilder(
         '💕 Por ' + data.author + ' 💕',
         data.message,
         image,
         data.author,
         image,
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
