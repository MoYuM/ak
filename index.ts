#!/usr/bin/env -S npx tsx

import { version } from './package.json';
import { Command } from "commander";
import preview from './preview';
import local from './local';


const program = new Command();

program.version(version);

program.command("preview [version]")
  .description("预览当前 npm 包，可输入一个版本")
  .action(preview)
program.command("local")
  .action(local)

program.parse();
