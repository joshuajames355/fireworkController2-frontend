export interface Channel {
  channelNumber: number;
  deviceName: string;
  connected: boolean; //If the continuity test passes on the device
}

export interface Program {
  name: string;
  entries: ProgramEntry[];
}

export interface ProgramEntry {
  channel: number;
  delayMs: number;
}

export interface DeviceStatus {
  deviceName: string;
  channels: Channel[];
  programs: Program[];
  connected: boolean; //If the device is currently connected to the server
}
