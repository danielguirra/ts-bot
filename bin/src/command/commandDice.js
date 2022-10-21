"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dice = void 0;
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.dice = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('d20')
        .setDescription('rola um d20 ou um valor passado')
        .addIntegerOption(options => options
        .setName('value')
        .setDescription('valor a ser sorteado')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const num = commandMessage.content.replace('*sorteio ', '');
        if (num >= 2) {
            const resultado = sorteador(num);
            return commandMessage.reply({
                embeds: [(0, getEmbed_1.embedBuilder)('D20', `Seu valor foi:**${resultado}** `)],
            });
        }
        else {
            const resultado = sorteador(20);
            return commandMessage.reply({
                embeds: [(0, getEmbed_1.embedBuilder)('D20', `Seu valor foi:**${resultado}** `)],
            });
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const num = commandSlash.options.get('value');
        if (num >= 2) {
            const resultado = sorteador(num);
            return commandSlash.reply({
                embeds: [(0, getEmbed_1.embedBuilder)('D20', `Seu valor foi:**${resultado}** `)],
            });
        }
        else {
            const resultado = sorteador(20);
            return commandSlash.reply({
                embeds: [(0, getEmbed_1.embedBuilder)('D20', `Seu valor foi:**${resultado}** `)],
            });
        }
    },
};
function sorteador(num) {
    let dado = Math.floor(Math.random() * num);
    return dado + 1;
}
