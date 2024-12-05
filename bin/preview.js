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
import local from "./local";
import open from "open";
import log from "./utils/log";
import { safeRequire } from "./utils";
import { cwd } from "node:process";
var ci = require('miniprogram-ci');
var config = {
    projectPath: path.resolve(__dirname, "../qr-mini-pay"),
    privateKeyPath: path.resolve(__dirname, "./private.wxd2f16468474f61b8.key"),
    npmRegister: 'https://jfrog.wosai-inc.com/artifactory/api/npm/npm-virtual-dev',
    qrcodeOutputDest: './qr.png'
};
export default (function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, akConfigSuccess, akConfig, akConfigError, projectPath, privateKeyPath, qrcodeOutputDest, projectConfigPath, appid, project, now, qrPath, time;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                log.info("获取 ak 配置");
                return [4 /*yield*/, safeRequire(path.join(cwd(), "ak.config.json"))];
            case 1:
                _a = _b.sent(), akConfigSuccess = _a.success, akConfig = _a.data, akConfigError = _a.error;
                if (!akConfigSuccess) {
                    log.error("ak.config.json not found", akConfigError);
                    return [2 /*return*/];
                }
                projectPath = config.projectPath, privateKeyPath = config.privateKeyPath, qrcodeOutputDest = config.qrcodeOutputDest;
                projectConfigPath = path.join(projectPath, "project.config.json");
                appid = require(projectConfigPath).appid;
                return [4 /*yield*/, local()];
            case 2:
                _b.sent();
                project = new ci.Project({
                    privateKeyPath: privateKeyPath,
                    projectPath: projectPath,
                    appid: appid,
                    type: 'miniProgram',
                });
                now = new Date().valueOf();
                return [4 /*yield*/, ci.preview({
                        project: project,
                        threads: 6,
                        desc: 'hello',
                        setting: {
                            useProjectConfig: true,
                        },
                        qrcodeFormat: 'image',
                        qrcodeOutputDest: qrcodeOutputDest,
                        onProgressUpdate: console.log,
                        bigPackageSizeSupport: true,
                        // pagePath: 'pages/index/index', // 预览页面
                        // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
                        // scene: 1011, // 场景值
                    })];
            case 3:
                _b.sent();
                qrPath = path.join(cwd(), qrcodeOutputDest);
                open(qrPath, { app: { name: "google chrome" } });
                time = new Date().valueOf() - now;
                console.log("\u8017\u65F6: ".concat(time / 1000, "s"));
                process.exit();
                return [2 /*return*/];
        }
    });
}); });
