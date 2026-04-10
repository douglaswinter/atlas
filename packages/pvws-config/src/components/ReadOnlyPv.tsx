import { Box, TextField } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import type { ParsePvProps } from "../types";
import { useParsedPvConnection } from "../useParsedPvConnection";
import { PvwsFallback } from "./PvwsFallback";

function PvComponent(props: ParsePvProps): JSX.Element {
  const latestValue = useParsedPvConnection(props);
  return (
    <TextField
      size="medium"
      slotProps={{
        input: { readOnly: true },
      }}
      label={props.label}
      value={latestValue}
    />
  );
}

export function ReadOnlyPv(props: ParsePvProps) {
  return (
    <ErrorBoundary fallback={<PvwsFallback />}>
      {PvComponent(props)}
    </ErrorBoundary>
  );
}
