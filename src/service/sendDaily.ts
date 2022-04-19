import axios from 'axios';
import { GuildTextBasedChannel } from 'discord.js';
import dotenv from 'dotenv';

import { embedBuilder } from '../util/getEmbed';

dotenv.config();

const url = `${process.env.URLAPIPENSADORIMAGE}/pensador/motivacao`;
const urlimage = process.env.URLAPIPENSADORIMAGE + '/gis/';

export const sendDaily = async (channelDaily: GuildTextBasedChannel) => {
  const data = await axios.get(url);
  const message = data.data.message;
  const author = data.data.author;
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
