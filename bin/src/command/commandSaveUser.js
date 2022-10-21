"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const getEmbed_1 = require("../../src/util/getEmbed");
const saveUser_1 = require("../database/querys/user/saveUser");
const verifyUser_1 = require("../database/querys/user/verifyUser");
dotenv_1.default.config();
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.saveUser = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('salvabanco')
        .setDescription('salva o seu usuário no banco de dados do bot')
        .addIntegerOption(options => options
        .setName('horas')
        .setDescription('hora para dm do clima')
        .setRequired(true))
        .addStringOption(options => options
        .setName('cidade')
        .setDescription('sua cidade meu nobre')
        .setRequired(true))
        .addStringOption(options => options
        .setName('nicklol')
        .setDescription('seu nick league of legends')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const city = commandMessage.content.replace('*salvabanco ', '');
        const user = commandMessage.author;
        const guild = commandMessage.guild;
        if (city && guild && user) {
            const result = await saveUserFunc(city, guild, user);
            const resultString = `${result}`;
            return commandMessage.reply({
                embeds: [
                    (0, getEmbed_1.embedBuilder)('Banco de Dados Capivareis', resultString, '', '', '', '', 'Green'),
                ],
            });
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const hour = commandSlash.options.getInteger('horas');
        const city = commandSlash.options.getString('cidade');
        const nickLol = commandSlash.options.getString('nicklol');
        const user = commandSlash.user;
        const guild = commandSlash.guild;
        if (city && guild && user && nickLol) {
            const result = await saveUserFunc(city, guild, user, hour, undefined, nickLol);
            const resultString = `${result}`;
            return commandSlash.reply({
                embeds: [
                    (0, getEmbed_1.embedBuilder)('Banco de Dados Capivareis', resultString, '', '', '', '', 'Green'),
                ],
            });
        }
        return commandSlash.reply({ embeds: [(0, getEmbed_1.embedBuilder)('', '')] });
    },
};
async function saveUserFunc(city, guild, user, hour = 8, sendItsTrue = true, nickLol) {
    const dateObjc = {
        hour: hour,
    };
    const userClimateObjc = {
        city: city,
        hourSendClimate: dateObjc,
        sendItsTrue: sendItsTrue,
    };
    const guildObjc = {
        id: guild?.id,
        name: guild?.name,
    };
    if (!nickLol)
        nickLol = '';
    const userObjc = {
        id: user.id,
        guild: guildObjc,
        username: user.username,
        discriminator: user.discriminator,
        userClimate: userClimateObjc,
        nickLol: nickLol,
    };
    const verify = await (0, verifyUser_1.verifyUser)(userObjc);
    if (!verify) {
        console.log(verify);
        const result = await (0, saveUser_1.saveUserDb)(userObjc);
        return result;
    }
    else {
        console.log(verify);
        return `O usuário ${userObjc.username} já consta no banco `;
    }
}
