import { TextField } from "@mui/material";
import type { ReactNode } from "react";

export function PvwsFallback(): ReactNode {
  return (
    <TextField
      color="error"
      slotProps={{
        input: { readOnly: true },
      }}
    >
      <b>Error Connecting!</b>
    </TextField>
  );
}
