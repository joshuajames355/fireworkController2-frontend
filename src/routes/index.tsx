import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@suid/material";
import { createMemo, createSignal, For } from "solid-js";
import { fireChannel, getDevices } from "~/api/launcherApi";
import { Channel, DeviceStatus, Program } from "~/api/types";
import { ChannelGrid } from "~/components/channelGrid";

import { MasterArmCard } from "~/components/masterArmCard";
import { EditProgramModel } from "~/components/programEditor";
import { ProgramGrid } from "~/components/programGrid";
import { THEME } from "~/components/theme";

// const MOCK_DEVICE_NAME = "Firework Launcher 2.0";
// const MOCK_CHANNELS: Channel[] = [...Array(6).keys()].map((i) => {
//   return {
//     channelNumber: i,
//     deviceName: MOCK_DEVICE_NAME,
//     connected: i == 2,
//   };
// });

// const MOCK_PROGRAMS: Program[] = [
//   {
//     name: "Fire 1+6",
//     entries: [
//       { channel: 0, delayMs: 200 },
//       { channel: 5, delayMs: 0 },
//     ],
//   },
// ];

export default function Home() {
  let [isArmed, setIsArmed] = createSignal(false);

  let [isEditProgramModalOpened, setIsEditProgramModalOpened] =
    createSignal(false);

  let [editProgramModelNumber, setEditProgramModelNumber] = createSignal(0);

  let [editProgramModelProgram, setEditProgramModelProgram] = createSignal<
    Program | undefined
  >();

  let [devices, setDevices] = createSignal<DeviceStatus[]>([]);
  getDevices().then((val) => setDevices(val));

  let sortedEditProgramModelProgram = createMemo<Program | undefined>(() => {
    let program = editProgramModelProgram();
    if (program == undefined) {
      return undefined;
    }

    return {
      name: program.name,
      entries: program.entries.toSorted((a, b) => a.delayMs - b.delayMs),
    };
  });

  return (
    <main>
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <MasterArmCard
          isArmed={isArmed()}
          toggleArmStatus={() => {
            setIsArmed(!isArmed());
          }}
        />

        <For each={devices()}>
          {(device: DeviceStatus) => {
            return (
              <>
                <ChannelGrid
                  channels={device.channels}
                  onFireChannel={(channel) => {
                    console.log(
                      `Firing channel ${channel.channelNumber} on device ${channel.deviceName}`,
                    );
                    fireChannel(channel);
                  }}
                  isArmed={isArmed()}
                  name={device.deviceName}
                />

                <ProgramGrid
                  programs={device.programs}
                  onFireProgram={(program) =>
                    console.log(`Firing program ${program.name}`)
                  }
                  isArmed={isArmed()}
                  onEditProgram={(program, number) => {
                    setIsEditProgramModalOpened(true);
                    setEditProgramModelProgram(program);
                    setEditProgramModelNumber(number);
                  }}
                />
              </>
            );
          }}
        </For>

        <EditProgramModel
          isOpen={isEditProgramModalOpened()}
          onClose={() => setIsEditProgramModalOpened(false)}
          onSubmit={() => { }}
          programNumber={editProgramModelNumber()}
          program={sortedEditProgramModelProgram()}
        />

        <AppBar
          position="fixed"
          color="secondary"
          sx={{ top: "auto", bottom: 0 }}
        >
          <Toolbar>
            <Typography>Connection Status: Alive</Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </main>
  );
}
