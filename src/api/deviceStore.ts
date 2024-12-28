"use server";

import {
  getBroadcastChannel,
  LauncherBroadcastChannel,
} from "./broadcastChannel";
import { DeviceStatus } from "./types";

let broadcast_channel: LauncherBroadcastChannel | undefined;

let devices: DeviceStatus[] = [];

export async function initDataStore() {
  if (!broadcast_channel) {
    broadcast_channel = getBroadcastChannel();

    broadcast_channel.onmessage = (event) => {
      if (event.data.type == "statusRequest") {
        console.log("sending!!!");
        broadcast_channel?.postMessage({ type: "statusUpdate", devices });
      }
    };
  }
}

export async function onDeviceConnected(name: string, numChannels: number) {
  let index = devices.findIndex((val) => val.deviceName == name);
  if (index != -1) {
    devices[index].connected = true;
  } else {
    let payload: DeviceStatus = {
      deviceName: name,
      channels: [...Array(numChannels).keys()].map((i) => {
        return {
          channelNumber: i,
          deviceName: name,
          connected: true, //TODO
        };
      }),
      connected: true,
      programs: [],
    };
    devices.push(payload);
  }
  broadcast_channel?.postMessage({ type: "statusUpdate", devices });
}

export async function onDeviceDisconnected(name: string) {
  let index = devices.findIndex((val) => val.deviceName == name);
  if (index != -1) {
    devices[index].connected = false;
    broadcast_channel?.postMessage({ type: "statusUpdate", devices });
  }
}
