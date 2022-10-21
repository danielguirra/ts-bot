"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.on = void 0;
const cron_1 = require("cron");
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("../client/client");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
const dailySender_1 = require("./dailySender");
const logDate_1 = require("./logDate");
dotenv_1.default.config();
const token = process.env.BOTTOKEN;
const hour = process.env.HORA || 0;
exports.on = client_1.client.on('ready', async () => {
    const guildID = await client_1.client.guilds.fetch(process.env.GUILD || '');
    const channelDaily = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(guildID.channels.resolve(process.env.DIA || ''));
    const channelLove = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(guildID.channels.resolve(process.env.LOVE || ''));
    const channelDolar = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(guildID.channels.resolve(process.env.DOLAR || ''));
    if (channelDolar && channelLove && channelDaily) {
        // const lastMessageIdChannelClimate = channelClimate.lastMessageId;
        // const lastMessageChannelClimate = await channelClimate.messages.fetch(
        //   lastMessageIdChannelClimate || '',
        // );
        // const dateLastMessageChannelClimateItsTrue = dateLastItsTrue(
        //   lastMessageChannelClimate,
        // );
        try {
            console.log((0, logDate_1.logDate)() + 'Clima diário será enviado');
            new cron_1.CronJob(`59 59 07 * * *`, () => {
                (0, dailySender_1.dailySender)({
                    channelDolar,
                    channelLove,
                    channelDaily,
                });
                console.log((0, logDate_1.logDate)() + 'Clima diário foi enviado');
            }).start();
        }
        catch (error) {
            console.log((0, logDate_1.logDate)() + `Erro ao enviar o as diárias tentando novamente`);
            try {
                (0, dailySender_1.dailySender)({
                    channelDolar,
                    channelLove,
                    channelDaily,
                });
            }
            catch (error) {
                console.log(logDate_1.logDate + `Erro ao enviar novamente`);
            }
            console.log((0, logDate_1.logDate)());
        }
    }
});
client_1.client.login(token);
