import { ActionSet, ActionGroup } from "../api/actions";
import { Grid, Paper, Typography, Divider } from "@suid/material";
import { ActionCard } from "./actionCard";

export interface ActionGridProps {
    actionSet: ActionSet;
    onFireActionGroup: (actionGroup: ActionGroup) => void;
    isArmed: boolean;
}

export function ActionGrid(props: ActionGridProps) {
    return (
        <Paper variant="elevation" elevation={2} sx={{ padding: 2, margin: 2 }}>
            <Typography component="div" variant="h4">
                {props.actionSet.name}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
                {props.actionSet.actionGroups.map((group: ActionGroup) => {
                    return (
                        <Grid item>
                            <ActionCard
                                actionGroup={group}
                                onFire={() => props.onFireActionGroup(group)}
                                isArmed={props.isArmed}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Paper>
    );
}