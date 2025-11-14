import { Command } from "commander";

/**
 * 默认命令
 * 当用户不提供任何子命令时执行
 */
export const pingCommand = new Command()
  .name("ping")
  .description("this is only for testing")
  .action(async () => {
    const response = await fetch("https://www.google.com");
    console.log(response);
    console.log("done");

    const secret = process.env.MY_SECRET_KEY;
    console.log("secret is :", secret);
  });
