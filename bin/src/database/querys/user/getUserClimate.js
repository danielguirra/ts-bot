"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAllDatabase = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const headers_1 = require("../headers");
const urlFindApiMongoDb_1 = require("./urlFindApiMongoDb");
dotenv_1.default.config();
async function getUserAllDatabase() {
    const data = JSON.stringify({
        collection: process.env.DBCOLLECTION,
        database: process.env.DBDATABASE,
        dataSource: process.env.DBSOURCE,
        filter: {},
    });
    try {
        const ver = await axios_1.default.post(urlFindApiMongoDb_1.urlFindApiMongoDb || '', data, {
            headers: headers_1.headers,
        });
        const documents = ver.data.documents;
        return documents;
    }
    catch (error) {
        return console.log(error);
    }
    return false;
}
exports.getUserAllDatabase = getUserAllDatabase;
