"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const VerifyUserExists_1 = require("./VerifyUserExists");
async function verifyUser(user) {
    if (user) {
        const userToVeri = {
            user: user,
        };
        try {
            const verf = await (0, VerifyUserExists_1.verifyUserExists)(userToVeri.user);
            if (verf) {
                return verf;
            }
        }
        catch (error) {
            return error;
        }
    }
}
exports.verifyUser = verifyUser;
