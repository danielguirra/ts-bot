"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dolar = void 0;
const discord_js_1 = require("discord.js");
const sendDolarDaily_1 = require("../service/send/sendDolarDaily");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.dolar = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('dolar')
        .setDescription('retorna valor do dolar atual'),
    async executeMessageCommand(commandMessage) {
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (channel) {
            const embed = await (0, sendDolarDaily_1.sendDolarDaily)(channel, true);
            return commandMessage.reply(embed || '');
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (channel) {
            const embed = await (0, sendDolarDaily_1.sendDolarDaily)(channel, true);
            return commandSlash.reply(embed || '');
        }
    },
};
