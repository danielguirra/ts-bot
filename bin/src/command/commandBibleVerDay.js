"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bibleverday = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
const bibleUrl = process.env.URLBIBLE;
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.bibleverday = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('bibleverday')
        .setDescription('retorna um versiculo'),
    async executeMessageCommand(commandMessage) {
        const ver = await axios_1.default.get(bibleUrl + '/arc/verdia');
        return commandMessage.reply({
            embeds: [
                (0, getEmbed_1.embedBuilder)('Versiculo do Dia', ver.data, undefined, undefined, undefined, undefined, 'Random'),
            ],
        });
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const ver = await axios_1.default.get(bibleUrl + '/arc/verdia');
        return commandSlash.reply({
            embeds: [
                (0, getEmbed_1.embedBuilder)('Versiculo do Dia', ver.data, undefined, undefined, undefined, undefined, 'Random'),
            ],
        });
    },
};
