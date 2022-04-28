"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const links_json_1 = require("../utils/links.json");
const tokens_json_1 = require("../utils/tokens.json");
const getGuestToken = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(links_json_1.TwitterGuestTokenURL, {}, {
            headers: {
                Accept: 'application/json',
                Authorization: tokens_json_1.TwitterAuthorization,
            }
        })
            .then(r => r);
        if (response.status !== 200 || response.data === '') {
            throw new Error;
        }
        const { guest_token } = response.data;
        return guest_token;
    }
    catch (e) {
        return new Error;
    }
});
exports.default = getGuestToken;
//# sourceMappingURL=getGuestToken.js.map