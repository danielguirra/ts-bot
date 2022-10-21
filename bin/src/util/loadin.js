"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadinCreator = void 0;
const delLastMessageById_1 = require("./delLastMessageById");
async function loadinCreator(command, exec, sender) {
    command.reply('Carregando...').then(async () => {
        const last = exec.channel;
        if (last && !sender) {
            const deletera = await (0, delLastMessageById_1.deleter)(last);
            const imageSender = await exec.func;
        }
        if (sender && last) {
            const deletera = await (0, delLastMessageById_1.deleter)(last);
            const imageSender = exec.func;
            sender.send({ attachments: [imageSender] });
        }
    });
}
exports.loadinCreator = loadinCreator;
