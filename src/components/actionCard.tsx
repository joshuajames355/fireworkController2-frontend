import {
    Card,
    CardContent,
    Button,
    Typography,
    Divider,
    CardActions,
} from "@suid/material";
import RocketLaunchIcon from "@suid/icons-material/RocketLaunch";
import { ActionGroup } from "../api/actions";

export interface ActionCardProps {
    actionGroup: ActionGroup;
    onFire: () => void;
    isArmed: boolean;
}

export function ActionCard(props: ActionCardProps) {
    return (
        <Card raised={true} sx={{ minWidth: 200 }}>
            <CardContent>
                <Typography component="div" variant="h5">
                    {props.actionGroup.name}
                </Typography>
                <Divider />
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    endIcon={<RocketLaunchIcon />}
                    size="large"
                    onClick={props.onFire}
                    disabled={!props.isArmed}
                >
                    Fire
                </Button>
            </CardActions>
        </Card>
    );
}