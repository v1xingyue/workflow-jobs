"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
const ping_1 = require("./ping");
const commands = [ping_1.pingCommand];
/**
 * 注册所有命令到 program
 * @param program Commander 实例
 */
function registerCommands(program) {
    commands.forEach((command) => {
        program.addCommand(command);
    });
}
