"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearChannel = void 0;
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.clearChannel = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('cls')
        .setDescription('apaga mensagem de ate 15 dias')
        .addIntegerOption(options => options
        .setName('value')
        .setDescription('valor a ser deletedo')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const numberMessageToDelete = stringForNumber(commandMessage.content.replace('*cls ', ''));
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandMessage.channel);
        if (channel) {
            const del = await channel.bulkDelete(numberMessageToDelete);
            if (del) {
                commandMessage.reply('Foi apagado ' + numberMessageToDelete);
                const time = await new Promise(f => setTimeout(f, 1000));
                channel.bulkDelete(1);
            }
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const numberMessageToDelete = stringForNumber(commandSlash.options.get('value'));
        const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
        if (channel) {
            const del = await channel.bulkDelete(numberMessageToDelete);
            if (del) {
                commandSlash.reply('Foi apagado ' + numberMessageToDelete);
                const time = await new Promise(f => setTimeout(f, 1000));
                channel.bulkDelete(1);
            }
        }
        return commandSlash.reply({ embeds: [(0, getEmbed_1.embedBuilder)('', '')] });
    },
};
function stringForNumber(numberString) {
    const number = numberString;
    return number;
}
