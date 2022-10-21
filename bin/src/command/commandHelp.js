"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const getEmbed_1 = require("../../src/util/getEmbed");
dotenv_1.default.config();
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.help = {
    data: new discord_js_1.SlashCommandBuilder().setName('ajuda').setDescription('ajuda'),
    async executeMessageCommand(commandMessage) {
        const helpFun = getHelp(commandMessage.guild);
        return commandMessage.reply({
            embeds: [
                (0, getEmbed_1.embedBuilder)(`Meu chamou?`, `${commandMessage.author}
     Se precisa de cargos estão aqui: ${helpFun?.channelRoles},
     Comandos: ${helpFun?.channelCommands}
     Qualquer coisa pode perguntar a eles ${helpFun?.roleMod}que irão te ajudar!`),
            ],
        });
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const helpFun = getHelp(commandSlash.guild);
        return commandSlash.reply({
            embeds: [
                (0, getEmbed_1.embedBuilder)(`Meu chamou?`, `${commandSlash.user}
     Se precisa de cargos estão aqui: ${helpFun?.channelRoles},
     Comandos: ${helpFun?.channelCommands}
     Qualquer coisa pode perguntar a eles ${helpFun?.roleMod}que irão te ajudar!`),
            ],
        });
    },
};
function getHelp(guild) {
    if (guild) {
        const roleMod = guild.roles.cache.find(role => role.id === process.env.ROLEMOD);
        const channelRoles = guild.channels.cache.find(channel => channel.id === process.env.CHANNELROLES);
        const channelCommands = guild.channels.cache.find(channel => channel.id === process.env.CHANNELCOMMANDS);
        return {
            roleMod,
            channelCommands,
            channelRoles,
        };
    }
}
