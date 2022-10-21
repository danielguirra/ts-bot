"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerolero = void 0;
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
const lerolero_1 = require("../util/lerolero");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.lerolero = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('lerolero')
        .setDescription('lerolero'),
    async executeMessageCommand(commandMessage) {
        return commandMessage.reply(embed);
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        return commandSlash.reply(embed);
    },
};
const embed = {
    embeds: [
        (0, getEmbed_1.embedBuilder)('Lero Lero', (0, lerolero_1.getLeroLero)(), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK_-Az0lr-qqNiYwQQmqVd4_suO63-BTKFZyL8IqZRjweIJuaPgerkP3FrWssLVZpNPs&usqp=CAU', 'Ovelha', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK_-Az0lr-qqNiYwQQmqVd4_suO63-BTKFZyL8IqZRjweIJuaPgerkP3FrWssLVZpNPs&usqp=CAU', undefined, '#ffffff', undefined),
    ],
};
