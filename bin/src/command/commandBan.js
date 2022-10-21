"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ban = void 0;
const discord_js_1 = require("discord.js");
/**
 * Don't forget to export
 * Não esqueça de exportar
 * @param Command
 * @danielguirra
 */
exports.ban = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bane o mencionado')
        .addUserOption(options => options
        .setName('target')
        .setDescription('cara a ser banido')
        .setRequired(true)),
    async executeMessageCommand(commandMessage) {
        const guild = commandMessage.guild;
        const user = commandMessage.mentions.users.first();
        const ban = await banUser(user, guild);
        if (ban) {
            return commandMessage.reply({
                content: `${user} foi banido com sucesso por ${commandMessage.author.tag}`,
            });
        }
        else {
            return commandMessage.reply({ content: `não posso banir o :${user}` });
        }
    },
    async executeSlashCommand(commandSlash) {
        const guild = commandSlash.guild;
        const user = commandSlash.options.getUser('target') || undefined;
        const ban = await banUser(user, guild);
        if (ban) {
            return commandSlash.reply({
                content: `${user} foi banido com sucesso por ${commandSlash.user}`,
            });
        }
        else {
            return commandSlash.reply({ content: `não posso banir o :${user}` });
        }
    },
};
async function banUser(user, guild) {
    if (user && guild) {
        const ban = await guild.members.ban(user);
        return true;
    }
    else {
        return false;
    }
}
