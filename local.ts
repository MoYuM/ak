import path from "node:path";
import { execSync } from "node:child_process";
import { cwd } from 'node:process'
import log from './utils/log';
import { safeRequire } from "./utils";
import { cp } from "fs/promises";

export default async () => {
  const now = new Date().valueOf();
  const time = () => {
    return (now - new Date().valueOf()) / 1000;
  }
  
  log.info("获取 ak 配置", time(), now)
  const {
    success: akConfigSuccess,
    data: akConfig,
    error: akConfigError,
  } = await safeRequire(path.join(cwd(), "ak.config.json"));
  if (!akConfigSuccess) {
    log.error("ak.config.json not found", akConfigError);
    return;
  }

  log.info("获取 package.json",time())
  const {
    success: packageJsonSuccess,
    data: packageJson,
    error: packageJsonError,
  } = await safeRequire(path.join(cwd(), "package.json"));
  if (!packageJsonSuccess) {
    log.error("package.json not found", packageJsonError);
    return;
  }

  const projectPath = path.resolve(cwd(), akConfig.miniprogramPath);

  // TODO: 并行
  // TODO: 直接 watch 拿最新的
  log.info("构建 npm", time())
  execSync(`cd ${cwd()} && npm run build`);
  
  log.info("复制到宿主小程序", time())
  const output = execSync(`cd ${projectPath} && git grep --name-only "${packageJson.name}" -- */package.json`, { encoding: "utf-8" })
  const pages = output.split("\n").filter(Boolean).map((i) => i.replace("/package.json", ""));

  if (pages && pages.length > 0) {
    const task = pages.map((i) =>
      cp(
        path.join(cwd(), "miniprogram_dist"),
        path.join(projectPath, i, "miniprogram_npm", packageJson.name),
        { recursive: true },
      ),
    );
    await Promise.all(task).catch((e) => console.error(e));
    log.info("done", time())
  } else {
    // TODO: 直接项目中替换
  }

  process.exit();
};
