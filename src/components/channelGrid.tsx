import { Grid, Paper, Typography, Divider, Box } from "@suid/material";
import { Channel, DeviceStatus } from "~/api/types";
import { ChannelCard } from "./channelCard";
import { For } from "solid-js";
import { Power, PowerOff } from "@suid/icons-material";

export interface ChannelGridProps {
  onFireChannel: (channel: Channel) => void;
  isArmed: boolean;
  device: DeviceStatus
}

export function ChannelGrid(props: ChannelGridProps) {
  return (
    <Paper variant="elevation" elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pl: 1,
          pb: 1,
        }}
      >
        <Typography component="div" variant="h4">
          {props.device.deviceName}
        </Typography>
        {props.device.connected ? <Power /> : <PowerOff color="error" />}
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        <For each={props.device.channels}>
          {(channel: Channel) => {
            return (
              <Grid item>
                <ChannelCard
                  onFire={() => props.onFireChannel(channel)}
                  isArmed={props.isArmed && props.device.connected}
                  channel={channel}
                />
              </Grid>
            );
          }}
        </For>
      </Grid>
    </Paper>
  );
}
