"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLoveMessageDaily = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const googleImage_1 = require("../../../googleImage");
const pensador_1 = require("../../util/pensador");
dotenv_1.default.config();
const sendLoveMessageDaily = async (channelLove) => {
    const data = await pensador_1.pensador.getFromAmor();
    const message = data.message;
    const author = data.author;
    const dataimage = await (0, googleImage_1.googleImagePensador)({ embedTitle: data.author, embedColor: '#AF0F8F' }, data, undefined, channelLove);
};
exports.sendLoveMessageDaily = sendLoveMessageDaily;
