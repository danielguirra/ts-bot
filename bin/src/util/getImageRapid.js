"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.RAPID;
async function getImage(query) {
    if (!token)
        return console.log(token);
    const options = {
        url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
        params: {
            q: query,
            pageNumber: '1',
            pageSize: '10',
            autoCorrect: 'true',
            safeSearch: 'true',
        },
        headers: {
            'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
            'X-RapidAPI-Key': token,
        },
    };
    const data = await axios_1.default.request(options);
    console.log(data.data.value[0].url);
    return data.data.value[0].url;
}
exports.getImage = getImage;
