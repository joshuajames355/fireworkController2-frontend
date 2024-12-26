import {
  Grid,
  Paper,
  Typography,
  Divider,
  Card,
  CardContent,
} from "@suid/material";
import { Channel, Program } from "~/api/programs";
import { ChannelCard } from "./channelCard";
import { For } from "solid-js";
import { ProgramCard } from "./programCard";
import { AddProgramCard } from "./addProgramCard";

export interface ProgramGridProps {
  onFireProgram: (program: Program) => void;
  isArmed: boolean;
  programs: Program[];
}

export function ProgramGrid(props: ProgramGridProps) {
  return (
    <Paper variant="elevation" elevation={2} sx={{ padding: 2, margin: 2 }}>
      <Typography component="div" variant="h4">
        Programs
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Grid container spacing={2}>
        <For each={props.programs}>
          {(program: Program) => {
            return (
              <Grid item>
                <ProgramCard
                  onFire={() => props.onFireProgram(program)}
                  isArmed={props.isArmed}
                  program={program}
                />
              </Grid>
            );
          }}
        </For>

        <Grid item>
          <AddProgramCard />
        </Grid>
      </Grid>
    </Paper>
  );
}
