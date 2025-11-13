#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config();

const cliMain = async () => {
  const value = process.env.MY_SECRET_KEY;
  console.log("Hello World from CLI", value);
};
cliMain();
