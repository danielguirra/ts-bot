"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advice = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
const translate_1 = require("../util/translate");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.advice = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('conselho')
        .setDescription('Conselho aletório'),
    async executeMessageCommand(commandMessage) {
        const avatar = commandMessage.author.displayAvatarURL({ extension: 'png' });
        const tag = commandMessage.author.username;
        const advice = await getRandomAdvice();
        return commandMessage.reply({
            embeds: [(0, getEmbed_1.embedBuilder)('Conselho', advice, avatar, tag)],
        });
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const avatar = commandSlash.user.displayAvatarURL({ extension: 'png' });
        const tag = commandSlash.user.username;
        const advice = await getRandomAdvice();
        return commandSlash.reply({
            embeds: [(0, getEmbed_1.embedBuilder)('Conselho', advice, avatar, tag)],
        });
    },
};
/**
 *
 * @returns Conselho um em portugues
 */
async function getRandomAdvice() {
    const url = `https://api.adviceslip.com/advice`;
    const advice = await axios_1.default.get(url);
    const text = advice.data.slip.advice;
    const result = (await (0, translate_1.translateText)(text)).text || '';
    return result;
}
