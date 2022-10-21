"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlFindApiMongoDb = void 0;
/**
 * Url para buscar
 */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.urlFindApiMongoDb = process.env.URLMONGODBAPIFIND;
