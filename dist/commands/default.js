"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCommand = void 0;
const commander_1 = require("commander");
/**
 * 默认命令
 * 当用户不提供任何子命令时执行
 */
exports.defaultCommand = new commander_1.Command()
    .name("default")
    .description("默认命令，显示帮助信息")
    .action(() => {
    console.log("欢迎使用 workflow-jobs CLI!");
    console.log("使用 --help 查看可用命令");
});
