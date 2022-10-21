"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guildMemberAdd = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("../client/client");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
const getEmbed_1 = require("../util/getEmbed");
dotenv_1.default.config();
exports.guildMemberAdd = client_1.client.on('guildMemberAdd', async (newMember) => {
    const roleC = process.env.ROLECAPIVARINHA;
    if (typeof roleC === 'string') {
        const roleNewMember = process.env.ROLECAPIVARINHA || '';
        const bem = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(newMember.guild.channels.cache.find(channel => channel.name.includes('bem-vindo')));
        const regras = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(newMember.guild.channels.cache.find(channel => channel.name.includes('regras')));
        const cargos = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(newMember.guild.channels.cache.find(channel => channel.name.includes('cargos')));
        const addRole = await newMember.roles.add(roleNewMember);
        if (addRole && bem) {
            const sender = bem.send({
                embeds: [
                    (0, getEmbed_1.embedBuilder)(`Seja Bem vindo ${newMember.displayName}`, `${newMember}
    Nossa regras estão aqui:${regras}
    Precisar de ajuda digite *ajuda ou use /ajuda
    Não esqueça de pegar seu cargo no :${cargos}`, newMember.user.avatarURL() || undefined, newMember.user.tag, newMember.user.avatarURL() || undefined, 'https://i.im.ge/2021/11/03/oN8EiT.png', newMember.displayHexColor),
                ],
            });
        }
    }
});
