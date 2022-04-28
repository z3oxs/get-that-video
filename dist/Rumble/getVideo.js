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
const getVideoInfo_1 = __importDefault(require("./getVideoInfo"));
const getVideo = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, {
            transformResponse: String,
        })
            .then(({ data }) => data);
        if (!response.includes(`"video"`)) {
            throw new Error('Possibly invalid URL parsed.');
        }
        const videoID = response.split(`,"video":"`)[1].split(`",`)[0];
        const video = yield (0, getVideoInfo_1.default)(videoID);
        return video;
    }
    catch (e) {
        return String(e);
    }
});
exports.default = getVideo;
