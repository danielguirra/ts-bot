"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployCommand = void 0;
const rest_1 = require("@discordjs/rest");
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const Builder_1 = require("../command/Builder");
const logDate_1 = require("../service/logDate");
dotenv_1.default.config();
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILD;
const rest = new rest_1.REST({ version: '10' }).setToken(process.env.BOTTOKEN || '');
const allComands = [];
for (const key of Builder_1.commands) {
    allComands.push(key[1].data.toJSON());
}
exports.deployCommand = rest
    .put(discord_js_1.Routes.applicationGuildCommands(clientId || '', guildId || ''), {
    body: allComands,
})
    .then(() => console.log((0, logDate_1.logDate)() + 'Os Comandos Foram Atualizados'))
    .catch(console.error);
