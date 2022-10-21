"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loreleagueoflegends = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const champRole_json_1 = __importDefault(require("../../data/json/champRole.json"));
const nameslol_json_1 = __importDefault(require("../../data/json/nameslol.json"));
const getEmbed_1 = require("../../src/util/getEmbed");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.loreleagueoflegends = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('loreleagueoflegends')
        .setDescription('loreleagueoflegends')
        .addStringOption(options => options
        .setName('champion')
        .setRequired(true)
        .setDescription('nome do champ')),
    async executeMessageCommand(commandMessage) {
        const champ = commandMessage.content.replace('*lore ', '');
        if (champ) {
            const lore = await getLoreChampionLeagueOfLegends(champ);
            return commandMessage.reply({ embeds: [lore] });
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const champ = commandSlash.options.get('champion');
        if (champ) {
            const lore = await getLoreChampionLeagueOfLegends(champ);
            return commandSlash.reply({ embeds: [lore] });
        }
    },
};
async function getLoreChampionLeagueOfLegends(champ) {
    const nameChamp = nameslol_json_1.default;
    const x = nameChamp[champ];
    if (x) {
        champ = x;
    }
    champ = champ.at(0) + champ.substring(champ.length, 1);
    const version = await axios_1.default.get('https://ddragon.leagueoflegends.com/api/versions.json');
    const icone = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/img/champion/${champ}.png`;
    const json = `http://ddragon.leagueoflegends.com/cdn/${version['data'][0]}/data/pt_BR/champion/${champ}.json`;
    const loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ}_0.jpg`;
    const splash = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg`;
    const response = await axios_1.default.get(json);
    const data = await response.data;
    const champdata = data.data;
    const lore = JSON.stringify(champdata[`${champ}`]['lore']);
    let role = JSON.stringify(champdata[`${champ}`]['tags'][0]);
    let role2 = JSON.stringify(champdata[`${champ}`]['tags'][1]);
    const rolesObjc = champRole_json_1.default;
    role = role.substring(1);
    role = role.replace(/.$/, '');
    role = rolesObjc[role];
    if (role2) {
        //Caso o champ possua uma unica role
        role2 = role2.substring(1);
        role2 = role2.replace(/.$/, '');
        role2 = rolesObjc[role2];
    }
    else {
        role2 = 'Unica função';
    }
    let dica = JSON.stringify(champdata[`${champ}`]['allytips']);
    dica = dica.substring(1);
    dica = dica.replace(/.$/, '');
    let title = JSON.stringify(champdata[`${champ}`]['title']);
    title = title.substring(1);
    title = title.replace(/.$/, '');
    let fraqueza = JSON.stringify(champdata[`${champ}`]['enemytips']);
    fraqueza = fraqueza.substring(1);
    fraqueza = fraqueza.replace(/.$/, '');
    return (0, getEmbed_1.embedBuilder)(`****Lore de ${champ} ${title}****`, `
        **Se quiser saber as skill's**
        *skill ${champ}
        ---------------
        **Lore**: ${lore}
        ---------------
        **Posição**: **\n${role}\n${role2}**
        ---------------
        **Como Jogar**: ${dica}
        ---------------
        **Como enfrentar** : ${fraqueza}
        
        `, icone, champ, loading, splash);
}
