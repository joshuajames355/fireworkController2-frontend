import {
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  CardActions,
  Icon,
  Box,
} from "@suid/material";
import RocketLaunchIcon from "@suid/icons-material/RocketLaunch";
import { Channel } from "~/api/types";
import { Power, PowerOff } from "@suid/icons-material";

export interface ChannelCardProps {
  channel: Channel;
  onFire: () => void;
  isArmed: boolean;
}

export function ChannelCard(props: ChannelCardProps) {
  return (
    <Card raised={true} sx={{ minWidth: 200 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pl: 1,
            pb: 1,
          }}
        >
          <Typography component="div" variant="h5">
            Channel {props.channel.channelNumber}
          </Typography>
          {props.channel.connected ? <Power /> : <PowerOff color="error" />}
        </Box>
        <Divider />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          endIcon={<RocketLaunchIcon />}
          size="large"
          onClick={props.onFire}
          disabled={!props.isArmed || !props.channel.connected}
          sx={{ width: 1 }}
        >
          Fire
        </Button>
      </CardActions>
    </Card>
  );
}
