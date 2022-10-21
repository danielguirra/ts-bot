"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gif = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const tenor = process.env.TENORKEY;
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.gif = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('gif')
        .setDescription('procura no tenor por gif')
        .addStringOption(option => option.setName('text').setDescription('digite algo').setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const gifText = commandMessage.content.replace('*gif ', '');
        const gif = await getGif(gifText);
        return commandMessage.reply(gif);
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const text = commandSlash.options.getString('text') || undefined;
        const gif = await getGif(text);
        return commandSlash.reply(gif);
    },
};
async function getGif(text = 'capivara') {
    let url = `https://g.tenor.com/v1/search?q=${text}&key=${tenor}&ContentFilter=G`;
    let response = (await axios_1.default.get(url)).data;
    const random = Math.floor(Math.random() * response.results.length);
    const result = response.results[random].url;
    return result;
}
