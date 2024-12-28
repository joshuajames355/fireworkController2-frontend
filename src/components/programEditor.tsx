import { Add, Close } from "@suid/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@suid/material";
import { createEffect, createSignal, For } from "solid-js";
import { Program, ProgramEntry } from "~/api/types";

export interface EditProgramModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  programNumber: number;
  program: Program | undefined;
}

const EMPTY_PROGRAM: Program = {
  entries: [],
  name: "",
};

const EMPTY_ENTRY: ProgramEntry = {
  channel: 0,
  delayMs: 0,
};

export const EditProgramModel = (props: EditProgramModelProps) => {
  const theme = useTheme();
  let [program, setProgram] = createSignal(props.program ?? EMPTY_PROGRAM);

  createEffect(() => {
    if (props.program) setProgram(props.program);
    else setProgram(EMPTY_PROGRAM);
  });

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme.palette.background.paper,
          border: "2px solid #000",
          boxShadow: "24px",
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Program {props.programNumber}
        </Typography>
        <Divider sx={{ paddingBottom: 2 }} />
        <TextField
          id="standard-basic"
          variant="standard"
          label="Program Name"
          defaultValue={props.program?.name}
          sx={{ margin: 2 }}
        />
        <Divider />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Channel Number </TableCell>
                <TableCell> DelayMs </TableCell>
                <TableCell> Remove </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={program().entries}>
                {(row, i) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        defaultValue={row.channel}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        defaultValue={row.delayMs}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setProgram({
                            entries: program().entries.filter(
                              (_, index) => index != i(),
                            ),
                            name: program().name,
                          });
                        }}
                        color="error"
                      >
                        <Close></Close>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>
                  <Button
                    variant="contained"
                    endIcon={<Add />}
                    size="large"
                    onClick={() => {
                      setProgram({
                        name: program().name,
                        entries: [...program().entries, EMPTY_ENTRY],
                      });
                    }}
                    sx={{ width: 1 }}
                  >
                    Add Row
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <Divider />
        <Button variant="contained" sx={{ marginTop: 2, width: 1 }}>
          Upload {props.program == undefined ? "New Program" : "Changes"}
        </Button>
      </Box>
    </Modal>
  );
};
