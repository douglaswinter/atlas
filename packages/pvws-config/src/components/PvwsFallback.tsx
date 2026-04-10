import { TextField } from "@mui/material";
import type { ReactNode } from "react";

export function PvwsFallback(): ReactNode {
  const errorMsg = <b>Error Connecting!</b>;
  return (
    <TextField
      color="error"
      slotProps={{
        input: { readOnly: true },
      }}
      defaultValue={errorMsg}
    />
  );
}
