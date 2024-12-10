import path from "node:path";
import local from "./local";
import open from "open";
import log from "./utils/log";
import { getDirPath, safeRequire } from "./utils";
import { cwd } from "node:process";
import { execSync } from "node:child_process";

const ci = require('miniprogram-ci');

const localConfig = {
  privateKeyPath: path.resolve(__dirname, "./private.wxd2f16468474f61b8.key"),
  qrcodeOutputDest: "./qr.png"
}


export default async (version: string) => {
  const {
    success: akConfigSuccess,
    data: config,
    error: akConfigError,
  } = await safeRequire(path.join(cwd(), "ak.config.json"));
  if (!akConfigSuccess) {
    log.error("没有找到 ak.config.json, 请在项目目录中创建", akConfigError);
    return;
  }

  const {
    success: packageJsonSuccess,
    data: packageJson,
    error: packageJsonError,
  } = await safeRequire(path.join(cwd(), "package.json"));
  if (!packageJsonSuccess) {
    log.error("package.json not found", packageJsonError);
    return;
  }

  const { privateKeyPath, qrcodeOutputDest } = localConfig;
  const { miniprogramPath } = config;
  const projectConfigPath = path.join(miniprogramPath, "project.config.json");
  const { appid } = require(projectConfigPath);

  const project = new ci.Project({
    projectPath: miniprogramPath,
    type: 'miniProgram',
    privateKeyPath,
    appid,
  })

  // 指定了版本
  if (version) {
    const pages = getDirPath(miniprogramPath, packageJson.name)
    for (const path of pages) {
      let command = `cd ${path} && npm install ${packageJson.name}@${version}`
      if (config.npmRegister) {
        command += ` --registry ${config.npmRegister}`
      }
      execSync(command);
    }
    // 在有需要的时候构建npm
    const warning = await ci.packNpm(project, {
      reporter: (infos: any) => { log.info(infos) }
    })
    log.info(warning)
  } else {
    // 没指定就用本地的代码
    await local();
  }


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
    pagePath: config.pathName,
    searchQuery: config.query,
    scene: config.scene
  })


  const qrPath = path.join(cwd(), qrcodeOutputDest)
  open(qrPath, { app: { name: "google chrome" } });
  const time = new Date().valueOf() - now;
  console.log(`耗时: ${time / 1000}s`);

  process.exit();
}
