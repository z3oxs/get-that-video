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
const tokens_json_1 = require("../utils/tokens.json");
const getVideo = (url) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = getVideo;
