"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserExists = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const headers_1 = require("../headers");
const urlFindOneApiMongoDb_1 = require("./urlFindOneApiMongoDb");
dotenv_1.default.config();
async function verifyUserExists(user) {
    const data = JSON.stringify({
        collection: process.env.DBCOLLECTION,
        database: process.env.DBDATABASE,
        dataSource: process.env.DBSOURCE,
        filter: {
            id: user.id,
        },
    });
    try {
        const ver = await axios_1.default.post(urlFindOneApiMongoDb_1.urlFindOneApiMongoDb || '', data, {
            headers: headers_1.headers,
        });
        if (ver.data.document.id === user.id) {
            console.log('Verify executado retornou ' + ver.data.document.username);
            return true;
        }
    }
    catch (error) {
        console.log('Usuário novo sendo salvo no Banco ID:' + user.id);
        return false;
    }
    return false;
}
exports.verifyUserExists = verifyUserExists;
