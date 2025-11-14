import { Command } from "commander";
import { pingCommand } from "./ping";

const commands: Command[] = [pingCommand];

/**
 * 注册所有命令到 program
 * @param program Commander 实例
 */
export function registerCommands(program: Command): void {
  commands.forEach((command) => {
    program.addCommand(command);
  });
}
