"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.motivacao = void 0;
const discord_js_1 = require("discord.js");
const googleImage_1 = require("../../googleImage");
const pensador_1 = require("../util/pensador");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.motivacao = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('motivacao')
        .setDescription('motivacao uma mensagem motivacional será enviada'),
    async executeMessageCommand(commandMessage) {
        const motivacaoFunc = await pensador_1.pensador.getFromMotivacionais();
        if (motivacaoFunc) {
            const embed = await (0, googleImage_1.googleImagePensador)(embedAux, motivacaoFunc, commandMessage);
        }
    },
    async executeSlashCommand(commandSlash) {
        if (!commandSlash.isChatInputCommand())
            return;
        const motivacaoFunc = await pensador_1.pensador.getFromMotivacionais();
        if (motivacaoFunc) {
            const embed = await (0, googleImage_1.googleImagePensador)(embedAux, motivacaoFunc, commandSlash);
        }
    },
};
const embedAux = {
    embedTitle: 'Messagem Motivacional',
};
