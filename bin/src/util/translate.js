"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = void 0;
const google_translate_api_1 = __importDefault(require("@vitalets/google-translate-api"));
const translateText = async (text, language) => {
    if (!language) {
        language = 'pt';
    }
    const result = await (0, google_translate_api_1.default)(text, { to: language });
    return result;
};
exports.translateText = translateText;
