#!/usr/bin/env -S npx tsx
import { version } from './package.json';
import { Command } from "commander";
import preview from './preview';
import local from './local';
var program = new Command();
program.version(version);
program.command("preview")
    .action(preview);
program.command("local")
    .action(local);
program.parse();
