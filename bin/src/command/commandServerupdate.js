"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverupdate = void 0;
const discord_js_1 = require("discord.js");
const update_1 = require("../../util/server/update");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.serverupdate = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('serverupdate')
        .setDescription('serverupdate'),
    async executeMessageCommand(commandMessage) {
        if (commandMessage.author.id === process.env.MODID)
            return commandMessage
                .reply('Comando de atualizar foi disparado')
                .then(m => {
                m.channel.send((0, update_1.att)());
            });
        else {
            return commandMessage.reply('Vc não é o Mr.Daniel');
        }
    },
    async executeSlashCommand(commandSlash) {
        if (commandSlash.user.id === process.env.MODID)
            return commandSlash
                .reply({
                content: 'Comando de atualizar foi disparado',
                ephemeral: true,
            })
                .then(m => {
                commandSlash.channel?.send({ content: (0, update_1.att)() });
            });
        else {
            return commandSlash.reply({
                content: 'Vc não é o Mr.Daniel',
                ephemeral: true,
            });
        }
    },
};
