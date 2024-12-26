import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@suid/material";
import { createSignal } from "solid-js";
import { Channel } from "~/api/programs";
import { ChannelGrid } from "~/components/channelGrid";

import { MasterArmCard } from "~/components/masterArmCard";
import { THEME } from "~/components/theme";

const MOCK_DEVICE_NAME = "MOCK_DEVICE_NAME";
const MOCK_CHANNELS: Channel[] = [...Array(6).keys()].map((i) => {
  return { channelNumber: i, deviceName: MOCK_DEVICE_NAME, connected: i == 2 };
});

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
