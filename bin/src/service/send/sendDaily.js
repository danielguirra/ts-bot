"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDaily = void 0;
const googleImage_1 = require("../../../googleImage");
const pensador_1 = require("../../util/pensador");
const sendDaily = async (channelDaily) => {
    const data = await pensador_1.pensador.getFromMotivacionais();
    const message = data.message;
    const author = data.author;
    const dataimage = await (0, googleImage_1.googleImagePensador)({ embedTitle: data.author }, data, undefined, channelDaily);
};
exports.sendDaily = sendDaily;
