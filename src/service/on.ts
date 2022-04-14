import { client } from "../client/client";
import dotenv from "dotenv";
import { channelItsGuildTextChannel } from "./channelItsGuildTextChannel";
import { dateLastItsTrue } from "./dateLastItsTrue";
dotenv.config();

const token = process.env.BOTTOKEN;

export const on =
    client.on("ready", async () => {
        const guildID = await client.guilds.fetch(process.env.GUILD || "");
        const channeldia = await channelItsGuildTextChannel(guildID.channels.resolve(process.env.DIA || ""));
        const channellove = await channelItsGuildTextChannel(guildID.channels.resolve(process.env.LOVE || ""));
        const channeldolar = await channelItsGuildTextChannel(guildID.channels.resolve(process.env.DOLAR || ""));
        const channelClimate = await channelItsGuildTextChannel(
            guildID.channels.resolve(process.env.CLIMA || "")
        );
        const lastMessageIdChannelClimate = channelClimate.lastMessageId
        const lastMessageChannelClimate = await channelClimate.messages.fetch(lastMessageIdChannelClimate || "")
        const dateLastMessageChannelClimateItsTrue = dateLastItsTrue(
            lastMessageChannelClimate
        );
        if (dateLastMessageChannelClimateItsTrue) {
            console.log("Clima diário não enviado");
        } else {
            console.log("Clima será enviado");
        }

    });


client.login(token);



