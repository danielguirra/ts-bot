"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.climateDaily = void 0;
const discord_js_1 = require("discord.js");
const sendClimate_1 = require("../service/send/sendClimate");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.climateDaily = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('climadiario')
        .setDescription('retorna o clima diário das 00:00 até as 21:00')
        .addStringOption(options => options
        .setName('cidade')
        .setDescription('cidade a ser retornada')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const city = commandMessage.content.replace('*clima ', '') || 'franca';
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (channel) {
            const clima = await (0, sendClimate_1.sendClimate)(channel, city);
            return commandMessage.reply({ embeds: [clima] });
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const city = commandSlash.options.get('cidade') || 'franca';
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (channel) {
            const clima = await (0, sendClimate_1.sendClimate)(channel, city);
            return commandSlash.reply({ embeds: [clima] });
        }
    },
};
