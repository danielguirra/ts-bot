"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCreate = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("../client/client");
const Builder_1 = require("../command/Builder");
const logDate_1 = require("./logDate");
dotenv_1.default.config();
const prefix = process.env.PREFIX;
exports.messageCreate = client_1.client.on('messageCreate', async (message) => {
    const args = message.content.slice(prefix?.length).trim().split(/ +/);
    const command = args[0].toLowerCase();
    if (!command)
        return;
    try {
        Builder_1.commands.get(command).executeMessageCommand(message);
        console.log((0, logDate_1.logDate)() +
            'Comando Message: ' +
            (await Builder_1.commands.get(command).data.name) +
            ' foi usado');
    }
    catch (error) {
        return;
    }
});
