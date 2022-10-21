"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertOneUserApiMongoDb = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const headers_1 = require("../headers");
const urlInsertOneApiMongoDb_1 = require("./urlInsertOneApiMongoDb");
dotenv_1.default.config();
async function InsertOneUserApiMongoDb(userToSave) {
    const data = JSON.stringify({
        collection: process.env.DBCOLLECTION,
        database: process.env.DBDATABASE,
        dataSource: process.env.DBSOURCE,
        document: userToSave,
    });
    try {
        const save = await axios_1.default.post(urlInsertOneApiMongoDb_1.urlInsertOneApiMongoDb || '', data, {
            headers: headers_1.headers,
        });
        if (save) {
            console.log(save.data);
            return `Usuário ${userToSave.username}  salvo no banco com Sucesso!!`;
        }
    }
    catch (error) {
        return `Erro ao executar o post na Api para Salvar O Usuário \n
        Erro: ${error}`;
    }
}
exports.InsertOneUserApiMongoDb = InsertOneUserApiMongoDb;
