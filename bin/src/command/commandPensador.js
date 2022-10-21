"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pensador = void 0;
const discord_js_1 = require("discord.js");
const googleImage_1 = require("../../googleImage");
const pensador_1 = require("../util/pensador");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.pensador = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('pensador')
        .setDescription('pensador'),
    async executeMessageCommand(commandMessage) {
        const soltas = await pensador_1.pensador.getFromSoltas();
        if (soltas) {
            const embed = await (0, googleImage_1.googleImagePensador)(embedAux, soltas, commandMessage);
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const soltas = await pensador_1.pensador.getFromSoltas();
        if (soltas) {
            const embed = await (0, googleImage_1.googleImagePensador)(embedAux, soltas, commandSlash);
        }
    },
};
const embedAux = {
    embedTitle: 'Pensador Frases Soltas',
};
