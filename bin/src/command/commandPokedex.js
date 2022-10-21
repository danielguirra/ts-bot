"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pokedex = void 0;
const discord_js_1 = require("discord.js");
const pkmonjs_1 = require("pkmonjs");
const getEmbed_1 = require("../../src/util/getEmbed");
const channelItsGuildTextChannel_1 = require("../util/channelItsGuildTextChannel");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.pokedex = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('pokedex')
        .setDescription('pokedex')
        .addStringOption(option => option
        .setDescription('pokemon name')
        .setName('pokemon')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const poke = commandMessage.content.replace('*pokedex ', '');
        try {
            const pokedex = await (0, pkmonjs_1.getPokemon)(poke);
            const embed = embedBuilderPokedex(pokedex);
            return commandMessage.reply({ embeds: [embed] });
        }
        catch (error) {
            return commandMessage.reply('verify pokemon name');
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const poke = commandSlash.options.getString('pokemon');
        if (poke) {
            const channel = await (0, channelItsGuildTextChannel_1.channelItsGuildTextChannel)(commandSlash.channel);
            if (channel) {
                const sender = commandSlash.reply('Pesquisando...').then(async () => {
                    const last = channel.lastMessage;
                    try {
                        const pokedex = await (0, pkmonjs_1.getPokemon)(poke);
                        const embed = embedBuilderPokedex(pokedex);
                        last?.edit({ embeds: [embed] });
                    }
                    catch (error) {
                        last?.edit('verify pokemon name');
                    }
                });
            }
        }
    },
};
function embedBuilderPokedex(pokemon) {
    let ty1 = pokemon.stats.types.name.type1;
    if (typeof pokemon.stats.types.name.type2 === 'string')
        ty1 = `${ty1}, ${pokemon.stats.types.name.type2}`;
    return (0, getEmbed_1.embedBuilder)(pokemon.name.toLocaleUpperCase(), `${pokemon.description}
   
    *Status:*
    Hit-points:${pokemon.stats.hp}❤
    Attack:${pokemon.stats.attack}⚔
    Defense:${pokemon.stats.defense}🛡
    Special Attack:${pokemon.stats.specialAttack}☄
    Special Defense:${pokemon.stats.specialDefense}🌟
    Speed:${pokemon.stats.speed}💨
    Height:${pokemon.stats.height}🏔
    Weight:${pokemon.stats.weight}⚖

    Habitat:${pokemon.habitat.name}

    Generation:${pokemon.generation.name}

    Types:**${ty1}**
    `, pokemon.image.default, pokemon.name, pokemon.image.default, pokemon.image.default, 'Red', 'https://www.pokemon.com/br/pokedex/' + pokemon.name);
}
