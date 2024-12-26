var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import path from "node:path";
import { execSync } from "node:child_process";
import { cwd } from 'node:process';
import log from './utils/log';
import { getDirPath, safeRequire } from "./utils";
import { cp } from "fs/promises";
export default (function () { return __awaiter(void 0, void 0, void 0, function () {
    var now, time, _a, akConfigSuccess, akConfig, akConfigError, _b, packageJsonSuccess, packageJson, packageJsonError, projectPath, pages, task;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                now = new Date().valueOf();
                time = function () {
                    return (now - new Date().valueOf()) / 1000;
                };
                log.info("获取 ak 配置", time(), now);
                return [4 /*yield*/, safeRequire(path.join(cwd(), "ak.config.json"))];
            case 1:
                _a = _c.sent(), akConfigSuccess = _a.success, akConfig = _a.data, akConfigError = _a.error;
                if (!akConfigSuccess) {
                    log.error("ak.config.json not found", akConfigError);
                    return [2 /*return*/];
                }
                log.info("获取 package.json", time());
                return [4 /*yield*/, safeRequire(path.join(cwd(), "package.json"))];
            case 2:
                _b = _c.sent(), packageJsonSuccess = _b.success, packageJson = _b.data, packageJsonError = _b.error;
                if (!packageJsonSuccess) {
                    log.error("package.json not found", packageJsonError);
                    return [2 /*return*/];
                }
                projectPath = path.resolve(cwd(), akConfig.miniprogramPath);
                // TODO: 并行
                // TODO: 直接 watch 拿最新的
                log.info("构建 npm", time());
                execSync("cd ".concat(cwd(), " && npm run build"));
                log.info("复制到宿主小程序", time());
                pages = getDirPath(projectPath, packageJson.name);
                if (!(pages && pages.length > 0)) return [3 /*break*/, 4];
                task = pages.map(function (i) {
                    return cp(path.join(cwd(), "miniprogram_dist"), path.join(i, "miniprogram_npm", packageJson.name), { recursive: true });
                });
                return [4 /*yield*/, Promise.all(task).catch(function (e) { return console.error(e); })];
            case 3:
                _c.sent();
                log.info("done", time());
                return [3 /*break*/, 4];
            case 4:
                process.exit();
                return [2 /*return*/];
        }
    });
}); });
