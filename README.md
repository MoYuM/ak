# 🔫 WX-AK

AK 服务于那些**用于微信小程序的 npm 包**的开发和调试，让你重回到命令行的怀抱，省去「npm构建」、「预览」等操作


## 安装

```
npm i wx-ak --global
```

## 使用

ak 是一个命令行工具，所有的命令都是在 npm 包目录下执行的。在使用之前需要在 npm 包目录下新建 `ak.config.json` 文件，具体配置见下文

### `ak load`

将本地或者指定版本的 npm 包安装到宿主小程序中并构建 npm，`ak load` 之后只要重新编译即可看到效果

```
ak load [version]
```

例如:
```bash
# 安装本地当前的版本到宿主小程序中
ak load

# 安装 1.1.0 版本到宿主小程序中
ak load 1.1.0

```


## 配置

在使用 AK 之前，需要做一些配置才能让 AK 正常工作。

在 npm 包目录下新建 `ak.config.json` 文件，并将其添加到 `.gitignore` 中（可选），`ak.config.json` 配置如下

```ts
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
```
