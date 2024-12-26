import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@suid/material";
import { createSignal } from "solid-js";
import { Channel, Program } from "~/api/programs";
import { ChannelGrid } from "~/components/channelGrid";

import { MasterArmCard } from "~/components/masterArmCard";
import { ProgramGrid } from "~/components/programGrid";
import { THEME } from "~/components/theme";

const MOCK_DEVICE_NAME = "MOCK_DEVICE_NAME";
const MOCK_CHANNELS: Channel[] = [...Array(6).keys()].map((i) => {
  return { channelNumber: i, deviceName: MOCK_DEVICE_NAME, connected: i == 2 };
});

const MOCK_PROGRAMS: Program[] = [
  {
    name: "Fire 1+6",
    entries: [
      { channel: 0, delayMs: 0 },
      { channel: 5, delayMs: 0 },
    ],
  },
];

export default function Home() {
  let [isArmed, setIsArmed] = createSignal(false);
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

        <ChannelGrid
          channels={MOCK_CHANNELS}
          onFireChannel={(channel) =>
            console.log(
              `Firing channel ${channel.channelNumber} on device ${channel.deviceName}`,
            )
          }
          isArmed={isArmed()}
          name={MOCK_DEVICE_NAME}
        />

        <ProgramGrid
          programs={MOCK_PROGRAMS}
          onFireProgram={(program) =>
            console.log(`Firing program ${program.name}`)
          }
          isArmed={isArmed()}
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
