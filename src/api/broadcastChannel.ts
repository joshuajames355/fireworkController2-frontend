import { DeviceStatus } from "./types";

const UPLOAD_BROADCAST_CHANNEL_NAME = "channel-1";

type ChannelPayload =
  | FireCommand
  | UploadProgramCommand
  | StatusRequestCommand
  | StatusUpdateCommand;
interface FireCommand {
  type: "fire";
  channel: number;
  device: string;
}
interface UploadProgramCommand {
  type: "programRequest";
  device: string;
}
interface StatusRequestCommand {
  type: "statusRequest";
}
interface StatusUpdateCommand {
  type: "statusUpdate";
  devices: DeviceStatus[];
}

export type LauncherBroadcastChannel = StrictBroadcastChannel<ChannelPayload>;

export const getBroadcastChannel: () => LauncherBroadcastChannel = () =>
  new BroadcastChannel(UPLOAD_BROADCAST_CHANNEL_NAME);

interface StrictBroadcastChannelEventMap<T> {
  message: MessageEvent<T>;
  messageerror: MessageEvent<T>;
}

interface StrictBroadcastChannel<T> extends EventTarget {
  readonly name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent<T>) => any) | null;
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent<T>) => any) | null;
  close(): void;
  postMessage(message: T): void;
  addEventListener<K extends keyof StrictBroadcastChannelEventMap<T>>(
    type: K,
    listener: (
      this: BroadcastChannel,
      ev: StrictBroadcastChannelEventMap<T>[K],
    ) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof StrictBroadcastChannelEventMap<T>>(
    type: K,
    listener: (
      this: BroadcastChannel,
      ev: StrictBroadcastChannelEventMap<T>[K],
    ) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}
