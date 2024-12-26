import { Card, CardActions, IconButton } from "@suid/material";
import { Add } from "@suid/icons-material";

export const AddProgramCard = () => {
  return (
    <Card raised={true}>
      <CardActions>
        <IconButton sx={{ width: 200, padding: 5 }}>
          <Add fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
};
