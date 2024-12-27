#!/usr/bin/env -S npx tsx

import { version } from './package.json';
import { Command } from "commander";
// import preview from './preview';
import load from './load';


const program = new Command();

program.version(version);

// program.command("preview [version]")
//   .description("预览当前 npm 包，可输入一个版本")
//   .action(preview)

program.command("load [version]")
  .description("将当前 npm 包注入宿主小程序，可选择版本")
  .action(load)

program.parse();
