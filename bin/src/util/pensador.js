"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pensador = void 0;
const axios_1 = __importDefault(require("axios"));
const striptags_1 = __importDefault(require("striptags"));
const urlPensador = 'https://www.pensador.com/blog.php';
exports.pensador = {
    getFromCollection: async (collection) => {
        const co = await getByParams({
            t: 'co',
            username: collection,
        });
        return co;
    },
    getFromAmor: async () => {
        const amor = await getByParams({
            t: 'fa',
        });
        return amor;
    },
    getFromMotivacionais: async () => {
        const motivacao = await getByParams({
            t: 'fm',
        });
        return motivacao;
    },
    getFromSoltas: async () => {
        const soltas = await getByParams({
            t: 'fs',
        });
        return soltas;
    },
};
async function getByParams(params) {
    const get = await axios_1.default.get(urlPensador, { params: params });
    const res = get.data;
    return transf2Object(res);
}
function transf2Object(text = '') {
    text = (0, striptags_1.default)(text
        .replace('document.write("', '')
        .replace('");', '')
        .replace('&quot;', '')
        .replace('“', '')
        .replace('”', '')
        .replace('” ', ''), ['br']);
    let arr = text.split('<br/>');
    let obj = {
        message: arr[0],
        author: arr[1],
    };
    if (arr.length > 2) {
        obj = {
            message: arr[0],
            author: arr[2],
        };
    }
    return obj;
}
