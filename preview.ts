import path from "node:path";
import { readFileSync } from 'node:fs';
import local from "./local";
import clipboard from "clipboardy";
import open from "open";
import log from "./utils/log";
import { safeRequire } from "./utils";
import { cwd } from "node:process";

const ci = require('miniprogram-ci');

const config = {
  projectPath: path.resolve(__dirname, "../qr-mini-pay"),
  privateKeyPath: path.resolve(__dirname, "./private.wxd2f16468474f61b8.key"),
  npmRegister: 'https://jfrog.wosai-inc.com/artifactory/api/npm/npm-virtual-dev',
  qrcodeOutputDest: './qr.png'
}


export default async () => {
  log.info("获取 ak 配置",)
  const {
    success: akConfigSuccess,
    data: akConfig,
    error: akConfigError,
  } = await safeRequire(path.join(cwd(), "ak.config.json"));
  if (!akConfigSuccess) {
    log.error("ak.config.json not found", akConfigError);
    return;
  }


  const { projectPath, privateKeyPath, qrcodeOutputDest } = config;
  const projectConfigPath = path.join(projectPath, "project.config.json");

  const { appid } = require(projectConfigPath);


  await local();
  const project = new ci.Project({
    privateKeyPath,
    projectPath,
    appid,
    type: 'miniProgram',
  })

  const now = new Date().valueOf();
  await ci.preview({
    project,
    threads: 6,
    desc: 'hello',
    setting: {
      useProjectConfig: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest,
    onProgressUpdate: console.log,
    bigPackageSizeSupport: true,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
    // scene: 1011, // 场景值
  })


  const qrPath = path.join(cwd(), qrcodeOutputDest)
  open(qrPath, { app: { name: "google chrome" } });
  const time = new Date().valueOf() - now;
  console.log(`耗时: ${time / 1000}s`);
  
  process.exit();
}
