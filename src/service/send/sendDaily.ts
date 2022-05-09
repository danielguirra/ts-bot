import axios from 'axios';
import { GuildTextBasedChannel } from 'discord.js';
import dotenv from 'dotenv';

import { embedBuilder } from '../../util/getEmbed';
import { pensador } from '../../util/pensador';

dotenv.config();

const urlimage = process.env.URLAPIPENSADORIMAGE + '/gis/';

export const sendDaily = async (channelDaily: GuildTextBasedChannel) => {
  const data: IPensador = await pensador.getFromMotivacionais();
  const message = data.message;
  const author = data.author;
  const dataimage = await axios.get(urlimage + author);
  const image = dataimage.data.url;

  channelDaily.send({
    embeds: [
      embedBuilder(
        author,
        `${message}`,
        image,
        author,
        image,
        image,
        'DARK_PURPLE',
        image,
      ),
    ],
  });
};
