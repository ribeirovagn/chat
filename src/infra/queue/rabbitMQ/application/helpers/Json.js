"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Json = /** @class */ (function () {
    function Json(value) {
        this.value = value;
    }
    Json.prototype.isValid = function () {
        try {
            JSON.parse(this.value);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    return Json;
}());
exports.default = Json;
