import { GuildTextBasedChannel } from 'discord.js';
import dotenv from 'dotenv';

import { googleImagePensador } from '../../../googleImage';
import { pensador } from '../../util/pensador';

dotenv.config();

export const sendLoveMessageDaily = async (
  channelLove: GuildTextBasedChannel,
) => {
  const data: IPensador = await pensador.getFromAmor();
  const message = data.message;
  const author = data.author;
  const dataimage = await googleImagePensador(
    { embedTitle: data.author, embedColor: '#AF0F8F' },
    data,
    undefined,
    channelLove,
  );
};
