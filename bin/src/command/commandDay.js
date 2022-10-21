"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.day = void 0;
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
const dailySender_1 = require("../service/dailySender");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.day = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('day')
        .setDescription('envia tudo do dia'),
    async executeMessageCommand(commandMessage) {
        const channels = await getChannels(commandMessage.client);
        const day = await (0, dailySender_1.dailySender)(channels);
        if (day) {
            return commandMessage.reply({
                embeds: [
                    (0, getEmbed_1.embedBuilder)('Tudo enviado', `Tenha um bom dia ${commandMessage.author}`, '', '', '', '', 'Yellow'),
                ],
            });
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const channels = await getChannels(commandSlash.client);
        const day = await (0, dailySender_1.dailySender)(channels);
        if (day) {
            return commandSlash.reply({
                embeds: [
                    (0, getEmbed_1.embedBuilder)('Tudo enviado', `Tenha um bom dia ${commandSlash.user}`, '', '', '', '', 'Yellow'),
                ],
            });
        }
    },
};
async function getChannels(client) {
    const guildID = await client.guilds.fetch(process.env.GUILD || '');
    const climateObjc = {
        channelDaily: await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(guildID.channels.resolve(process.env.DIA || '')),
        channelLove: await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(guildID.channels.resolve(process.env.LOVE || '')),
        channelDolar: await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(guildID.channels.resolve(process.env.DOLAR || '')),
        channelClimate: await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(guildID.channels.resolve(process.env.CLIMA || '')),
    };
    return climateObjc;
}
