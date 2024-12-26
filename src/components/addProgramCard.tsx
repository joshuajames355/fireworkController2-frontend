import { Card, CardActions, IconButton } from "@suid/material";
import { Add } from "@suid/icons-material";

export interface AddProgramCardProps {
  onClick: () => void;
}

export const AddProgramCard = (props: AddProgramCardProps) => {
  return (
    <Card raised={true}>
      <CardActions>
        <IconButton sx={{ width: 200, padding: 5 }} onClick={props.onClick}>
          <Add fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
};
