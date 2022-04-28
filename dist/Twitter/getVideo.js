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
const getGuestToken_1 = __importDefault(require("./getGuestToken"));
const getVideo = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const videoID = url.split('/')[5];
    const guestToken = yield (0, getGuestToken_1.default)();
    const getVideoURL = links_json_1.TwitterVideoURL.replace('{{ videoID }}', videoID);
    try {
        if (guestToken instanceof Error) {
            throw new Error('Failed to get guest token.');
        }
        const response = yield axios_1.default.get(getVideoURL, {
            headers: {
                Host: 'twitter.com',
                Authorization: tokens_json_1.TwitterAuthorization,
                'X-Guest-Token': guestToken,
            },
            transformResponse: String
        })
            .then(({ data }) => data);
        if (!response.includes(`"variants"`)) {
            throw new Error('Possible invalid URL parsed.');
        }
        const variants = JSON.parse(response.split(`"variants":`)[1].split(`}}]`)[0]);
        return variants;
    }
    catch (e) {
        return String(e);
    }
});
exports.default = getVideo;
