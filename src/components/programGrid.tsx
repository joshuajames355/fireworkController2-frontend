import { Grid, Paper, Typography, Divider } from "@suid/material";
import { Program } from "~/api/programs";
import { Accessor, For } from "solid-js";
import { ProgramCard } from "./programCard";
import { AddProgramCard } from "./addProgramCard";

export interface ProgramGridProps {
  onFireProgram: (program: Program) => void;
  isArmed: boolean;
  programs: Program[];
  onEditProgram: (program: Program | undefined, number: number) => void;
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
          {(program: Program, i: Accessor<number>) => {
            return (
              <Grid item>
                <ProgramCard
                  onFire={() => props.onFireProgram(program)}
                  isArmed={props.isArmed}
                  program={program}
                  onEdit={() => props.onEditProgram(program, i())}
                />
              </Grid>
            );
          }}
        </For>

        <Grid item>
          <AddProgramCard
            onClick={() =>
              props.onEditProgram(undefined, props.programs.length)
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
