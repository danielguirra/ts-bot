import axios from 'axios';
import { GuildTextBasedChannel } from 'discord.js';
import dotenv from 'dotenv';

import { embedBuilder } from '../util/getEmbed';

dotenv.config()

const urlamor = `${process.env.URLAPIPENSADORIMAGE}/pensador/amor`
const urlimage = process.env.URLAPIPENSADORIMAGE + '/gis/'

export const sendLoveMessageDaily = async (channelLove: GuildTextBasedChannel) => {
    const data = await axios.get(urlamor)
    const message = data.data.message
    const author = data.data.author
    const image = await axios.get(urlimage + author.trim())
    const dataimage = image.data.url

    /**
     * Para testes
     */
    const result = {
        message,
        author,
        dataimage
    }


    channelLove.send({ embeds: [embedBuilder(author, `${message}`, dataimage, author, dataimage, dataimage, '#C100CF', dataimage)] })

}
