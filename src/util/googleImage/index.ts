import {
   GuildTextBasedChannel,
   InteractionResponse,
   Message,
} from 'discord.js';

import gis from 'async-g-i-s';

/**
 *
 * @param text
 * @param channel
 * @param mensage
 */
export async function googleImage(
   text: string,
   channel?: GuildTextBasedChannel,
   mensage?: Message | InteractionResponse
) {
   if (mensage && channel)
      try {
         const results = await gis(text);
         await mensage.edit(`Achei aqui resultado de ${text}`);
         return channel.send(results[0].url);
      } catch (e) {
         await mensage.edit(`Não consegui achar nada com a palavra *${text}*`);
         console.error(e);
      }
   else {
      try {
         const results = await gis(text);
         return results[0].url;
      } catch (error) {
         console.error('dont find image based in ' + text);
         return undefined;
      }
   }
}
