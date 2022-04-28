"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facebook = void 0;
const getInfo_1 = __importDefault(require("./getInfo"));
const getVideo_1 = __importDefault(require("./getVideo"));
exports.Facebook = {
    getInfo: getInfo_1.default,
    getVideo: getVideo_1.default,
};
