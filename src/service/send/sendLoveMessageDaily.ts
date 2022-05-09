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
    data.author,
    data,
    undefined,
    channelLove,
    '#AF0F8F',
  );
};
