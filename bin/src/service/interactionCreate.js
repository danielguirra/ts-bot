"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionCreate = void 0;
const discord_js_1 = require("discord.js");
const client_1 = require("../client/client");
const Builder_1 = require("../command/Builder");
const logDate_1 = require("./logDate");
exports.interactionCreate = client_1.client.on('interactionCreate', async (interaction) => {
    if (interaction.type === discord_js_1.InteractionType.ApplicationCommand) {
        if (!interaction.isChatInputCommand())
            return;
        const command = Builder_1.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            await command.executeSlashCommand(interaction);
            console.log((0, logDate_1.logDate)() +
                'Comando Slash: ' +
                (await command.data.name) +
                ' foi usado');
        }
        catch (error) {
            return;
        }
    }
});
