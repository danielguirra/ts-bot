"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const getUserClimate_1 = require("../../database/querys/user/getUserClimate");
const users = async () => {
    return await (0, getUserClimate_1.getUserAllDatabase)();
};
exports.users = users;
