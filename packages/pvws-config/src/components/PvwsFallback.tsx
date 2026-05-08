import { TextField } from "@mui/material";
import type { ReactNode } from "react";

export function PvwsFallback(): ReactNode {
  const errorMsg = <b>Error Connecting!</b>;
  return (
    <TextField
      slotProps={{
        input: { readOnly: true, color: "error" },
      }}
      defaultValue={errorMsg}
    />
  );
}
