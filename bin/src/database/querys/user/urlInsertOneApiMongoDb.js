"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlInsertOneApiMongoDb = void 0;
/**
 * Url para Inserir
 */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.urlInsertOneApiMongoDb = process.env.URLMONGODBAPIINSERTONE;
