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
exports.reddit = void 0;
const axios_1 = __importDefault(require("axios"));
const formats_json_1 = require("../utils/formats.json");
class reddit {
    getVideoInfo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(url)
                .then(({ data }) => data);
            return response;
        });
    }
    static getVideo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlToJSON = url[url.length - 1] === '/' ? url.slice(0, -1).concat('.json') : url.concat('.json');
            const videoInfo = JSON.stringify(yield this.prototype.getVideoInfo(urlToJSON));
            const mainVideoURL = JSON.parse(videoInfo.split(`"reddit_video":`)[1].split(`},`)[0]).fallback_url;
            const mainQuality = String(mainVideoURL).split('DASH_')[1].split('.')[0];
            const videoID = String(mainVideoURL).split('.it/')[1].split('/')[0];
            const validFormats = formats_json_1.reddit.filter(i => parseInt(i) <= parseInt(mainQuality));
            const videoLinks = validFormats.map(i => `https://v.redd.it/${videoID}/DASH_${i}.mp4`);
            const video = {
                info: JSON.parse(videoInfo),
                video: videoLinks.map((i, k) => {
                    return {
                        quality: validFormats[k],
                        url: i,
                    };
                }),
                audio: `https://v.redd.it/${videoID}/DASH_audio.mp4`,
            };
            return video;
        });
    }
}
exports.reddit = reddit;
