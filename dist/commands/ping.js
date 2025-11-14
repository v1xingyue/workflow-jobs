"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingCommand = void 0;
const commander_1 = require("commander");
/**
 * 默认命令
 * 当用户不提供任何子命令时执行
 */
exports.pingCommand = new commander_1.Command()
    .name("ping")
    .description("ping命令，测试网络连接")
    .action(() => {
    console.log("ping命令，测试网络连接");
});
