import log from "./log";
import path from "node:path";
import { cwd } from "node:process";

export type AkConfig = {
  /**
   * 宿主小程序的绝对路径，必填
   * */
  miniprogramPath: string;
  /**
   * npm 包构建命令
   * @default "npm run build"
   * */
  buildCommand: string;
  /**
   * npm 包产出路径
   * @default "miniprogram_dist"
   * */
  distPath: string;
  /**
   * 微信小程序绝对私钥路径
   * 如果使用了 ak load <version> 或者预览、上传相关功能则此项必填，具体见 {@link https://www.npmjs.com/package/miniprogram-ci miniprogram-ci}
   * */
  privateKeyPath: string;
}

const defaultConfig: Partial<AkConfig> = {
  buildCommand: "npm run build",
  distPath: "miniprogram_dist",
}

/**
 * 获取 ak.config.json
 * */
export function getAkConfig(): AkConfig | null {
  let config = null;
  try {
    const akConfig = require(path.join(cwd(), "ak.config.json"));
    if (akConfig) {
      config = {
        ...akConfig,
        ...defaultConfig,
      }
    }
  } catch (e) {
    log.error("获取配置错误", e);
  }
  return config;
}
