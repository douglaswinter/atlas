import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useGetQueuedTasks, useGetQueueState } from "../queue/queueService";
import type { QueueTableData } from "../queue/tableData";

function extractDataFromQueue(): QueueTableData[] {
  const queuedTasks = useGetQueuedTasks();
  let data: QueueTableData[] = [];
  queuedTasks.data?.map((task) =>
    data.push({
      position: task.position,
      instrumentSession: task.experiment_definition.instrument_session,
      sampleId: task.experiment_definition.sample_id,
      planRunning: task.experiment_definition.plan_name,
      // parameters: task.experiment_definition.params,
      status: task.status,
    }),
  );
  return data;
}

export function QueueView() {
  const queueStatus = useGetQueueState();
  let data = extractDataFromQueue();

  // NOTE doesn't seem to like that params inevitable ends up being an object
  const columns = useMemo<MRT_ColumnDef<QueueTableData>[]>(
    () => [
      { accessorKey: "position", header: "Position", size: 150 },
      {
        accessorKey: "instrumentSession",
        header: "Instrument Session",
        size: 150,
      },
      { accessorKey: "sampleId", header: "Sample ID", size: 150 },
      { accessorKey: "planRunning", header: "Plan", size: 150 },
      // { accessorKey: "parameters", header: "Plan params", size: 150 },
      { accessorKey: "status", header: "Status", size: 150 },
    ],
    [],
  );
  const table = useMaterialReactTable({ columns, data });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Stack direction={"column"} spacing={4} alignItems={"center"}>
        <Typography component={"h2"} variant="h5">
          Queue status: {queueStatus.data?.paused ? "paused" : "running"}
        </Typography>
        <MaterialReactTable table={table} />
      </Stack>
    </Box>
  );
}
