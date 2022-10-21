"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
exports.apiToken = process.env.APITOKENMONGODB;
dotenv_1.default.config();
