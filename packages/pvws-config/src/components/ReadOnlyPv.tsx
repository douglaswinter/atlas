import { Box, TextField, Typography, useTheme } from "@mui/material";
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
      variant="standard"
    />
  );
}

function defaultPvBox(props: ParsePvProps) {
  const latestValue = useParsedPvConnection(props);
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="body1" color={theme.palette.text.primary}>
        <b>{props.label} </b> {latestValue}
        {props.units}
      </Typography>
    </Box>
  );
}

export function ReadOnlyPv(props: ParsePvProps) {
  return (
    <ErrorBoundary fallback={<PvwsFallback />}>
      {defaultPvBox(props)}
    </ErrorBoundary>
  );
}
