import {
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  CardActions,
  Box,
  IconButton,
} from "@suid/material";
import RocketLaunchIcon from "@suid/icons-material/RocketLaunch";
import { Program } from "~/api/programs";
import { Edit } from "@suid/icons-material";

export interface ProgramCardProps {
  program: Program;
  onFire: () => void;
  isArmed: boolean;
}

export function ProgramCard(props: ProgramCardProps) {
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
            {props.program.name}
          </Typography>
          <IconButton>
            <Edit />
          </IconButton>
        </Box>
        <Divider />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          endIcon={<RocketLaunchIcon />}
          size="large"
          onClick={props.onFire}
          disabled={!props.isArmed} //TODO, check if all channels are connected, maybe indicate their status somewhere???
          sx={{ width: 1 }}
        >
          Fire
        </Button>
      </CardActions>
    </Card>
  );
}
