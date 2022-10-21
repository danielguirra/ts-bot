"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joke = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.joke = {
    data: new discord_js_1.SlashCommandBuilder().setName('joke').setDescription('joke'),
    async executeMessageCommand(commandMessage) {
        const embed = await getJoke();
        return commandMessage.reply({ embeds: [embed] });
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const embed = await getJoke();
        return commandSlash.reply({ embeds: [embed] });
    },
};
async function getJoke() {
    const logo = 'https://www.piadasnet.com/imagens/Logotipos/LogotipoBoneco_peq.png';
    const url = 'https://www.piadasnet.com/piadas-curtas.htm';
    const response = await axios_1.default.get(url, { responseType: 'arraybuffer' });
    const $ = cheerio_1.default.load(response.data.toString('binary'));
    const text = $('p[class=piada]').text();
    return (0, getEmbed_1.embedBuilder)('Piadas Curtas', text, logo, 'PiadasNet', logo, undefined, 'Yellow', url);
}
