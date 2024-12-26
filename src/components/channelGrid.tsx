import { Grid, Paper, Typography, Divider } from "@suid/material";
import { Channel } from "~/api/programs";
import { ChannelCard } from "./channelCard";
import { For } from "solid-js";

export interface ChannelGridProps {
  onFireChannel: (channel: Channel) => void;
  isArmed: boolean;
  channels: Channel[];
  name: string;
}

export function ChannelGrid(props: ChannelGridProps) {
  return (
    <Paper variant="elevation" elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Typography component="div" variant="h4">
        {props.name}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        <For each={props.channels}>
          {(channel: Channel) => {
            return (
              <Grid item>
                <ChannelCard
                  onFire={() => props.onFireChannel(channel)}
                  isArmed={props.isArmed}
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
