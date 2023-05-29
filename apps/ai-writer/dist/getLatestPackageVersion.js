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
exports.getLatestPackageVersion = void 0;
const https_1 = __importDefault(require("https"));
function getLatestPackageVersion(packageName) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            hostname: 'registry.npmjs.org',
            port: 443,
            path: `/${packageName}`,
            method: 'GET',
        };
        return new Promise((resolve, reject) => {
            const req = https_1.default.request(options, res => {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', chunk => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData['dist-tags'].latest);
                    }
                    catch (error) {
                        reject(error.message);
                    }
                });
            });
            req.on('error', reject);
            req.end();
        });
    });
}
exports.getLatestPackageVersion = getLatestPackageVersion;
//# sourceMappingURL=getLatestPackageVersion.js.map