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
