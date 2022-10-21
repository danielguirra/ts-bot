"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bible = exports.bible = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.bible = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('bible')
        .setDescription('bible')
        .addStringOption(options => options
        .setName('version')
        .setDescription('arc = ALMEIDA, kja = KING JAMES')
        .setRequired(true))
        .addStringOption(options => options
        .setName('book')
        .setRequired(true)
        .setDescription('book for search'))
        .addIntegerOption(options => options
        .setName('chapter')
        .setRequired(true)
        .setDescription('chapter for search'))
        .addIntegerOption(options => options
        .setName('verse')
        .setRequired(true)
        .setDescription('verse for search')),
    async executeMessageCommand(commandMessage) {
        return commandMessage.reply('Use somente no slash');
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const BibleVersion = commandSlash.options.getString('version');
        const BibleBook = commandSlash.options.getString('book');
        const BibleChapter = commandSlash.options.getInteger('chapter');
        const BibleVerse = commandSlash.options.getInteger('verse');
        if (BibleVersion && BibleBook && BibleChapter && BibleVerse) {
            const bible = new Bible();
            bible.book = BibleBook;
            bible.chapter = BibleChapter;
            bible.verse = BibleVerse;
            bible.version = BibleVersion;
            const respo = bible.geter();
            respo?.then(f => {
                return commandSlash.reply({
                    embeds: [
                        (0, getEmbed_1.embedBuilder)('Biblia Sagrada', f.data, undefined, `${BibleBook} ${BibleChapter} ${BibleVerse}`),
                    ],
                });
            });
        }
        else {
            return commandSlash.reply('Verifique os dados');
        }
    },
};
class Bible {
    urlForGet = process.env.URLBIBLE;
    version;
    book;
    chapter;
    verse;
    geter = () => {
        if (this.urlForGet &&
            this.verse &&
            this.version &&
            this.book &&
            this.chapter) {
            const get = axios_1.default.get(`${this.urlForGet}/${this.version}/${this.book}/${this.chapter}/${this.verse}`);
            return get;
        }
    };
}
exports.Bible = Bible;
