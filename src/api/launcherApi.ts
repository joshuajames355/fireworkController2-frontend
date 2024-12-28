"use server";

import { getBroadcastChannel } from "./broadcastChannel";
import { Channel, DeviceStatus } from "./types";

export const fireChannel = async (channel: Channel) => {
  const broadcast_channel = getBroadcastChannel();
  broadcast_channel.postMessage({
    type: "fire",
    device: channel.deviceName,
    channel: channel.channelNumber,
  });
  broadcast_channel.close();
};

export const getDevices: () => Promise<DeviceStatus[]> = () => {
  return new Promise<DeviceStatus[]>((resolve, reject) => {
    const broadcast_channel = getBroadcastChannel();
    broadcast_channel.postMessage({ type: "statusRequest" });
    broadcast_channel.onmessage = (ev) => {
      if (ev.data.type == "statusUpdate") {
        resolve(ev.data.devices);
        broadcast_channel.close();
      }
    };
  });
};
