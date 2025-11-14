#!/usr/bin/env node

import { Command } from "commander";
import dotenv from "dotenv";
import { registerCommands } from "./commands";

const program = new Command();
program.version("1.0.0");

// 注册所有命令
registerCommands(program);

const cliMain = async () => {
  dotenv.config();
  program.parse(process.argv);
};
cliMain();
