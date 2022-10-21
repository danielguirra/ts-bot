"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatar = void 0;
const discord_js_1 = require("discord.js");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.avatar = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Obtenha a URL do avatar do usuário selecionado ou do seu próprio avatar.')
        .addUserOption(options => options
        .setName('user')
        .setDescription('usuário para retornar')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const user = commandMessage.mentions.users.first();
        if (user) {
            return commandMessage.reply(user.displayAvatarURL({ extension: 'png' }));
        }
    },
    async executeSlashCommand(commandSlash) {
        const user = commandSlash.options.getUser('user');
        if (user) {
            return commandSlash.reply(user.displayAvatarURL({ extension: 'png' }));
        }
    },
};
