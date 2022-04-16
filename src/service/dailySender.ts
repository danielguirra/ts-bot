import { GuildTextBasedChannel, User } from "discord.js";
import { sendDolarDaily } from "./sendDolarDaily";
import { sendLoveMessageDaily } from "./sendLoveMessageDaily";
import users from '../../users.json'
import { client } from "../client/client";
import { sendClimate,sendClimateCurrentTime } from "./sendClimate";
import { channelItsGuildTextChannel } from "./channelItsGuildTextChannel";
import { sendDaily } from "./sendDaily";


export async function dailySender(channelClimate: GuildTextBasedChannel, channelDolar: GuildTextBasedChannel, channelLove: GuildTextBasedChannel, channelDaily: GuildTextBasedChannel) {
    try {
        sendDolarDaily(channelDolar)
        sendLoveMessageDaily(channelLove)
        sendClimate(channelClimate, 'franca')
        sendDaily(channelDaily)

        for (const user of users) {
            const userSend = await client.users.fetch(user.id)
            const userChannel = await channelItsGuildTextChannel(userSend)

            userSend.send(await sendClimateCurrentTime(userChannel, user.cidade))
        }

    } catch (error) {

    }
}


