import path from "node:path";
import { execSync } from "node:child_process";
import { cwd } from 'node:process'
import { getDirPath } from "./utils";
import { cp } from "fs/promises";
import { getAkConfig, AkConfig } from "./utils/config";
import log from "./utils/log";


const copyBuildToMp = async (akConfig: AkConfig, packageJson: any) => {
  const { buildCommand, miniprogramPath, distPath } = akConfig;
  const { name } = packageJson;

  const curPath = cwd();

  const projectPath = path.resolve(curPath, miniprogramPath);
  const miniprogramDist = path.join(curPath, distPath);

  // 构建 npm 包
  execSync(`cd ${curPath} && ${buildCommand}`);

  // 找到宿主小程序中对应目录
  const pages = getDirPath(projectPath, name)

  if (!pages.length) {
    log.error(`没有在宿主小程序中找到 ${name} 的路径`)
    return;
  }

  // 直接复制 npm 包到 miniprogram_npm 下
  const task = pages.map((i) =>
    cp(
      miniprogramDist,
      path.join(i, "miniprogram_npm", name),
      { recursive: true },
    ),
  );
  await Promise.all(task).catch((e) => console.error(e));
}

const updateNpmAndBuild = async (akConfig: AkConfig, packageJson: any, version: string) => {

  const { miniprogramPath, privateKeyPath } = akConfig;
  const { name } = packageJson;

  const projectConfigPath = path.join(miniprogramPath, "project.config.json");
  const { appid } = require(projectConfigPath);

  const ci = require('miniprogram-ci');
  const project = new ci.Project({
    projectPath: miniprogramPath,
    type: 'miniProgram',
    privateKeyPath,
    appid,
  })

  const pages = getDirPath(miniprogramPath, name)

  for (const path of pages) {
    let command = `cd ${path} && npm install ${name}@${version}`
    // if (config.npmRegister) {
    //   command += ` --registry ${config.npmRegister}`
    // }
    execSync(command);
  }
  // 在有需要的时候构建npm
  await ci.packNpm(project, {
    reporter: (infos: any) => {
      log.info(JSON.stringify(infos, null, 2))
    }
  })
}

export default async (version: string) => {

  const akConfig = getAkConfig();
  const packageJson = require(path.join(cwd(), "package.json"));

  if (!akConfig) {
    log.error("没有找到 ak.config.json")
    return;
  };
  if (!packageJson) {
    log.error("没有找到 package.json")
    return;
  };


  if (version) {
    await updateNpmAndBuild(akConfig, packageJson, version)
  } else {
    await copyBuildToMp(akConfig, packageJson);
  }

  log.success("🔫 装填成功！")

  process.exit();
};
