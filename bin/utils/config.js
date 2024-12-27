var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import log from "./log";
import path from "node:path";
import { cwd } from "node:process";
var defaultConfig = {
    buildCommand: "npm run build",
    distPath: "miniprogram_dist",
};
/**
 * 获取 ak.config.json
 * */
export function getAkConfig() {
    var config = null;
    try {
        var akConfig = require(path.join(cwd(), "ak.config.json"));
        if (akConfig) {
            config = __assign(__assign({}, akConfig), defaultConfig);
        }
    }
    catch (e) {
        log.error("获取配置错误", e);
    }
    return config;
}
