"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObjc = void 0;
function mergeObjc(obj1, obj2) {
    let names = [];
    for (const key in obj1) {
        if (Object.prototype.hasOwnProperty.call(obj1, key)) {
            const element = obj1[key];
            const itsExits = names.findIndex(poketype => poketype.name === element.name);
            if (itsExits < 0)
                names.push(element);
        }
    }
    for (const key in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, key)) {
            const element = obj2[key];
            const itsExits = names.findIndex(poketype => poketype.name === element.name);
            if (itsExits < 0)
                names.push(element);
        }
    }
    return names;
}
exports.mergeObjc = mergeObjc;
