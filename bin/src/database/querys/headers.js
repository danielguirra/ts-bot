"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = void 0;
const apiToken_1 = require("../apiToken");
exports.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': apiToken_1.apiToken,
};
