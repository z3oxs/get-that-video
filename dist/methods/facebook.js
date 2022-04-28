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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebook = void 0;
const axios_1 = __importDefault(require("axios"));
const tokens_json_1 = require("../utils/tokens.json");
class facebook {
}
exports.facebook = facebook;
_a = facebook;
// Return only the video formats as a Array of Objects
facebook.getVideo = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                Accept: tokens_json_1.FacebookAcceptHeader,
            }
        })
            .then(({ data }) => data);
        if (!response.includes(`"representations"`)) {
            throw new Error('Possibly invalid URL parsed.');
        }
        const formats = JSON.parse(response.replace(`\\`, '').split(`"representations":`)[1].split(`,"video_id"`)[0]);
        return formats;
    }
    catch (e) {
        return String(e);
    }
});
// Will return all important information about the video, like the title, author
// and all the formats as a Array of Objects
facebook.getInfo = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                Accept: tokens_json_1.FacebookAcceptHeader,
            }
        })
            .then(({ data }) => data);
        if (!response.includes(`"representations"`)) {
            throw new Error('Possibly invalid URL parsed.');
        }
        const info = {
            title: response.split(`"message":{"text":"`)[1].split(`",`)[0],
            author: JSON.parse(response.replace(`\\`, '').split(`"owner_as_page":`)[1].split(`,"__isActor"`)[0]),
            formats: JSON.parse(response.replace(`\\`, '').split(`"representations":`)[1].split(`,"video_id"`)[0]),
        };
        return info;
    }
    catch (e) {
        return String(e);
    }
});
