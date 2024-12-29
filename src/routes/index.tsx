import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@suid/material";
import { createMemo, createSignal, For, onMount } from "solid-js";
import { fireChannel, getDevices } from "~/api/launcherApi";
import { DeviceStatus, Program } from "~/api/types";
import { ChannelGrid } from "~/components/channelGrid";

import { MasterArmCard } from "~/components/masterArmCard";
import { EditProgramModel } from "~/components/programEditor";
import { ProgramGrid } from "~/components/programGrid";
import { THEME } from "~/components/theme";

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

  let ws: WebSocket | undefined;

  onMount(() => {
    if (ws == undefined) {
      ws = new WebSocket("ws://" + location.host + "/ws");
      ws.addEventListener("message", (data) => {
        let new_devices = JSON.parse(data.data);
        setDevices(new_devices);
      });
    }
  })

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
                  onFireChannel={(channel) => {
                    console.log(
                      `Firing channel ${channel.channelNumber} on device ${channel.deviceName}`,
                    );
                    fireChannel(channel);
                  }}
                  isArmed={isArmed()}
                  device={device}
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
