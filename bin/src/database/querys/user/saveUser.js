"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserDb = void 0;
const InsertOneUser_1 = require("./InsertOneUser");
async function saveUserDb(user) {
    if (user) {
        const userToSave = {
            user: user,
        };
        try {
            const save = await (0, InsertOneUser_1.InsertOneUserApiMongoDb)(userToSave.user);
            if (save) {
                return save;
            }
        }
        catch (error) {
            return error;
        }
    }
    else {
        return 'UserSave? 🤔';
    }
}
exports.saveUserDb = saveUserDb;
