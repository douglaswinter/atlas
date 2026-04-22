import { Box, Typography, useTheme } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import type { ParsePvProps, RenderPvProps } from "../types";
import { useParsedPvConnection } from "../useParsedPvConnection";
import { PvwsFallback } from "./PvwsFallback";

function renderValueWithUnits({
  value,
  units,
}: {
  value: string;
  units: string;
}) {
  if (value != "not connected" && value != undefined) {
    return value.concat(units);
  } else {
    return value;
  }
}

export function DefaultPvBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="body1" color={theme.palette.text.primary}>
        <b>{label} </b> {value}
      </Typography>
    </Box>
  );
}

function PvComponent(props: ParsePvProps) {
  const latestValue = useParsedPvConnection(props);
  const fullValue = props.units
    ? renderValueWithUnits({ value: latestValue, units: props.units })
    : latestValue;
  return <DefaultPvBox label={props.label} value={fullValue} />;
}

export function ReadOnlyPv(props: ParsePvProps) {
  return (
    <ErrorBoundary fallback={<PvwsFallback />}>
      {PvComponent(props)}
    </ErrorBoundary>
  );
}
