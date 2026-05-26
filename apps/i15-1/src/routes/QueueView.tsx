import { Box, Stack, Typography } from "@mui/material";
import { useInstrumentSession } from "../context/instrumentSession/useInstrumentSession";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type ExperimentDefinition = {
  plan_name: string;
  sample_id: number;
  //   params: object;  // NOTE: Can't use objects in here!!!
  instrument_session: string;
};

// TODO use react-query for filling table
export function QueueView() {
  const { instrumentSession } = useInstrumentSession();
  const data: ExperimentDefinition[] = [
    {
      plan_name: "sleep",
      sample_id: 1,
      //   params: { time: 10 },
      instrument_session: instrumentSession,
    },
    {
      plan_name: "load",
      sample_id: 2,
      //   params: {},
      instrument_session: instrumentSession,
    },
    {
      plan_name: "sleep",
      sample_id: 3,
      //   params: { time: 5 },
      instrument_session: instrumentSession,
    },
    {
      plan_name: "unload",
      sample_id: 4,
      //   params: {},
      instrument_session: instrumentSession,
    },
  ];

  const columns = useMemo<MRT_ColumnDef<ExperimentDefinition>[]>(
    () => [
      {
        accessorKey: "instrument_session",
        header: "Instrument Session",
        size: 150,
      },
      { accessorKey: "plan_name", header: "Plan", size: 150 },
      { accessorKey: "sample_id", header: "Sample ID", size: 150 },
      //   { accessorKey: "params", header: "Parameters", size: 150 },
    ],
    [],
  );
  const table = useMaterialReactTable({ columns, data });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Stack direction={"column"} spacing={4} alignItems={"center"}>
        <Typography component={"h1"} variant="h5">
          Example queue table
        </Typography>
        <MaterialReactTable table={table} />
      </Stack>
    </Box>
  );
}
