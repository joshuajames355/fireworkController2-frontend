"use server";

import * as net from "node:net";

const TCP_PORT = 8124;

export async function initTcpServer() {
  let server = net
    .createServer((c) => {
      console.log(`new connection from ${c.address()}`);
    })
    .on("error", (err) => {
      console.log(err);
    });

  server.listen(TCP_PORT, () => {
    console.log("server bound");
  });
}

export const fireChannel = async (channel: number) => {};
