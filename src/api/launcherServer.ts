"use server";

import * as net from "node:net";
import { getBroadcastChannel } from "./broadcastChannel";
import { initDataStore, onDeviceConnected, onDeviceDisconnected } from "./deviceStore";

const TCP_PORT = 8124;
let server: net.Server | undefined;
const HEART_BEAT_INTERVAL = 5000;

//api spec
//all messages begin with length of message

//messages from server to launcher
//b - request heartbeat
//s - request a full status update
//f[channel] - fire a channel
//p - program

//messages from launcher to server
//b - response to heartbeat
//c[count] - number of channels
//n[name] - name of device
//a - ack previous command
//p - program

export async function initTcpServer() {
  if (!server) {
    initDataStore();
    server = net
      .createServer((c) => {
        console.log(`new connection from ${c.remoteAddress}`);

        const sendHeartBeat = () => {
          c.write("b");
        };

        const handleTimeout = () => {
          clearTimeout(timeoutHandle);
          clearTimeout(heartBeatHandle);
          c.end();
          console.log(
            `Closing connection from ${c.remoteAddress} due to timeout`,
          );
          if (name) onDeviceDisconnected(name);
        };

        let timeoutHandle: NodeJS.Timeout | undefined = setTimeout(
          handleTimeout,
          HEART_BEAT_INTERVAL * 2,
        );
        let heartBeatHandle: NodeJS.Timeout | undefined;

        let name: string | undefined;

        c.write("s");

        const broadcast_channel = getBroadcastChannel();

        let data: Buffer<ArrayBufferLike> = Buffer.alloc(0);

        broadcast_channel.onmessage = (event) => {
          if (
            event.data.type === "fire" &&
            event.data.device === name &&
            event.data.channel !== undefined
          ) {
            console.log(`Firing ${event.data.channel}`);
            c.write("f" + event.data.channel.toString());
          }
        };

        c.on("close", () => {
          console.log(`socket closed from ${c.remoteAddress}`);
          clearTimeout(timeoutHandle);
          clearTimeout(heartBeatHandle);
          broadcast_channel.close();
          c.destroy();
          if (name) onDeviceDisconnected(name);
        });
        c.on("error", (err) => {
          console.log(`socket closed due to error from ${c.remoteAddress}`);
          console.log(err);
        });
        c.on("data", (new_data) => {
          let [msg, left_over] = extractNextMessage(
            Buffer.concat([data, new_data]),
          );
          data = left_over ?? Buffer.alloc(0);

          clearTimeout(timeoutHandle);
          clearTimeout(heartBeatHandle);

          timeoutHandle = setTimeout(handleTimeout, HEART_BEAT_INTERVAL * 2);
          heartBeatHandle = setTimeout(sendHeartBeat, HEART_BEAT_INTERVAL);

          while (msg !== undefined && msg.length > 0) {
            if (msg[0] == "c".charCodeAt(0)) {
              console.log(`Device has ${msg[1]} channels`);
              if (name) {
                onDeviceConnected(name, msg[1]);
              }
            } else if (msg[0] == "n".charCodeAt(0)) {
              name = msg.toString().slice(1);
              console.log(`Device has name ${name}`);
            } else if (msg[0] == "b".charCodeAt(0)) {
            } else {
              console.log(`Received ${msg} from ${c.remoteAddress}`);
            }

            [msg, left_over] = extractNextMessage(data);
            data = left_over ?? Buffer.alloc(0);
          }
        });
      })
      .on("error", (err) => {
        console.log("Error called on server");
        console.log(err);
      });

    server.listen(TCP_PORT, () => {
      console.log("server bound");
    });
  }
}

function extractNextMessage(data: Buffer<ArrayBufferLike>) {
  const length = data[0];

  if (length > data.length) {
    return [undefined, data];
  }
  const msg = data.subarray(1, length);
  const left_over = data.subarray(length);

  return [Buffer.from(msg), Buffer.from(left_over)];
}
