"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const _1 = require(".");
const logDate_1 = require("./service/logDate");
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.get('/', (req, res) => res.send('Servidor online'));
app.listen(port, () => console.log((0, logDate_1.logDate)() + 'O bot está rodando na porta ' + port));
_1.run;
