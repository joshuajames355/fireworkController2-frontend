import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@suid/material";
import { createSignal } from "solid-js";
import { Action, makeAction, makeActionGroupFromAction } from "~/api/actions";
import { ActionGrid } from "~/components/actionGrid";
import { MasterArmCard } from "~/components/masterArmCard";
import { THEME } from "~/components/theme";

const MY_ACTIONS: Action[] = [...Array(6).keys()].map((_: number, i: number) =>
  makeAction("Channel " + (i + 1).toString(), i + 1),
);

const DEFAULT_ACTION_SET = {
  actionGroups: MY_ACTIONS.map(makeActionGroupFromAction),
  name: "Channels",
};

const MY_CUSTOM_ACTIONS: Action[] = [...Array(2).keys()].map(
  (_: number, i: number) => makeAction("Program " + (i + 1).toString(), i + 1),
);

const CUSTOM_GROUP_ACTION_SET = {
  actionGroups: MY_CUSTOM_ACTIONS.map(makeActionGroupFromAction),
  name: "Programs",
};

export default function Home() {
  let [isArmed, setIsArmed] = createSignal(false);
  return (
    <main>
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <MasterArmCard isArmed={isArmed()} toggleArmStatus={() => {setIsArmed(!isArmed())}} />

        <ActionGrid
          actionSet={DEFAULT_ACTION_SET}
          onFireActionGroup={(actionGroup) => console.log("Firing!!! ")}
          isArmed={isArmed()}
        />

        <ActionGrid
          actionSet={CUSTOM_GROUP_ACTION_SET}
          onFireActionGroup={(actionGroup) => console.log("Firing!!! ")}
          isArmed={true}
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
