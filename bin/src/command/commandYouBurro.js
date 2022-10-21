"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youburro = void 0;
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.youburro = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('youburro')
        .setDescription('youburro'),
    async executeMessageCommand(commandMessage) {
        return commandMessage.reply({ embeds: [(0, getEmbed_1.embedBuilder)('', '')] });
    },
    async executeSlashCommand(commandSlash) {
        return commandSlash.reply({ embeds: [(0, getEmbed_1.embedBuilder)('', '')] });
    },
};
