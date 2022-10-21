"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.att = void 0;
const child_process_1 = require("child_process");
console.log('Iniciando att');
const att = () => {
    (0, child_process_1.exec)('cd .. && cd .. && cd .. && cd .. && cd sbond && cd receitas-gostosas-api && ls', (err, out, er) => {
        if (err)
            console.log(err);
        if (out) {
            console.log(out);
        }
        if (err)
            console.log(err);
    });
    return 'OK';
};
exports.att = att;
