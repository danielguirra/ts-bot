"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queuqlol = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const getEmbed_1 = require("../../src/util/getEmbed");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.queuqlol = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('queuqlol')
        .setDescription('queuqlol')
        .addStringOption(options => options
        .setName('nicklol')
        .setRequired(true)
        .setDescription('nick lol for queuq'))
        .addStringOption(options => options.setName('region').setDescription('select region by default BR')),
    async executeMessageCommand(commandMessage) {
        return commandMessage.reply('somente em slash');
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const nick = commandSlash.options.getString('nicklol');
        let region = commandSlash.options.getString('region');
        if (region === null) {
            region = 'br1';
        }
        return commandSlash.reply('Carregando').then(async (f) => {
            if (nick === null)
                return;
            if (region === null)
                return;
            const ge = await getQueuq(nick, region);
            const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
            if (channel === null)
                return;
            await embedBuilderForLol(ge, channel);
            const id = f.id;
            const delter = channel.messages.fetch(id);
            (await delter).delete();
        });
    },
};
async function getQueuq(nickLol, region) {
    const getter = await axios_1.default.get(`http://receitasgostosas.top:3001/match/live/?region=${region}&nick=${nickLol}`);
    return getter.data;
}
async function embedBuilderForLol(queuq, channel) {
    let players = [];
    let embeds = [];
    for (let index = 0; index < 10; index++) {
        const iterator = queuq.participants[index];
        let player = {
            nick: iterator.summonerName,
            championName: iterator.championInfo.champions.name,
            image: iterator.championInfo.champions.image.tile,
        };
        players.push(player);
    }
    for (let index = 0; index < 10; index++) {
        const iterator = players[index];
        let rank = queuq.participants[index].rank;
        if (rank.length > 1) {
            rank =
                `**Solo**: ` +
                    `**${rank[0].tier}**` +
                    ' ' +
                    `**${rank[0].rank}**` +
                    ` 
        **Flex**: ` +
                    `**${rank[1].tier}**` +
                    ' ' +
                    `**${rank[1].rank}**`;
        }
        else {
            rank = `**Solo**: ` + `**${rank[0].tier}**` + ' ' + `**${rank[0].rank}**`;
        }
        if (index < 5) {
            embeds.push((0, getEmbed_1.embedBuilder)(`${iterator.nick}`, `${rank}`, iterator.image, iterator.nick, iterator.image, undefined, 'Blue', undefined));
        }
        else {
            embeds.push((0, getEmbed_1.embedBuilder)(`${iterator.nick}`, `${rank}`, iterator.image, iterator.nick, iterator.image, undefined, 'Red', undefined));
        }
    }
    channel.send({ embeds });
}
