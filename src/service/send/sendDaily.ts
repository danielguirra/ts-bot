import { GuildTextBasedChannel } from 'discord.js';

import { googleImagePensador } from '../../../googleImage';
import { pensador } from '../../util/pensador';

export const sendDaily = async (channelDaily: GuildTextBasedChannel) => {
  const data: IPensador = await pensador.getFromMotivacionais();
  const message = data.message;
  const author = data.author;
  const dataimage = await googleImagePensador(
    data.author,
    data,
    undefined,
    channelDaily,
  );
};
