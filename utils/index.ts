import { execSync } from "node:child_process";
import { join } from "node:path";

export const requireSync = (path: string) => {
  return new Promise<{ success: boolean, data: any, error: any }>((resolve, reject) => {
    try {
      const res = require(path);
      resolve({
        success: true,
        data: res,
        error: null,
      });
    } catch (e) {
      reject({
        success: false,
        data: null,
        error: e,
      })
    }
  })
}

export const safeRequire = async (path: string) => {
  return requireSync(path).then(e => e).catch(e => e);
}

/**
 * 找到所有引用了某个包的目录
 * @param projectPath 项目目录
 * @param name 要找的包名
 * */
export const getDirPath = (projectPath: string, name: string) => {
  const output = execSync(`cd ${projectPath} && git grep --name-only "${name}" -- */package.json`, { encoding: "utf-8" })
  return output.split("\n").filter(Boolean).map((i) => i.replace("/package.json", "")).map(i => join(projectPath, i));
}
