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
import { getDirPath } from "./utils";
import { cp } from "fs/promises";
import { getAkConfig } from "./utils/config";
import log from "./utils/log";
export default (function () { return __awaiter(void 0, void 0, void 0, function () {
    var curPath, akConfig, packageJson, miniprogramPath, buildCommand, distPath, name, projectPath, miniprogramDist, pages, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                curPath = cwd();
                akConfig = getAkConfig();
                packageJson = require(path.join(cwd(), "package.json"));
                if (!akConfig) {
                    log.error("没有找到 ak.config.json");
                    return [2 /*return*/];
                }
                ;
                if (!packageJson) {
                    log.error("没有找到 package.json");
                    return [2 /*return*/];
                }
                ;
                miniprogramPath = akConfig.miniprogramPath, buildCommand = akConfig.buildCommand, distPath = akConfig.distPath;
                name = packageJson.name;
                projectPath = path.resolve(curPath, miniprogramPath);
                miniprogramDist = path.join(curPath, distPath);
                // 构建 npm 包
                execSync("cd ".concat(curPath, " && ").concat(buildCommand));
                pages = getDirPath(projectPath, name);
                if (!pages.length) {
                    log.error("\u6CA1\u6709\u5728\u5BBF\u4E3B\u5C0F\u7A0B\u5E8F\u4E2D\u627E\u5230 ".concat(name, " \u7684\u8DEF\u5F84"));
                    return [2 /*return*/];
                }
                task = pages.map(function (i) {
                    return cp(miniprogramDist, path.join(i, "miniprogram_npm", name), { recursive: true });
                });
                return [4 /*yield*/, Promise.all(task).catch(function (e) { return console.error(e); })];
            case 1:
                _a.sent();
                log.success("🔫 装填成功！");
                process.exit();
                return [2 /*return*/];
        }
    });
}); });
