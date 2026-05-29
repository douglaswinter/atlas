import { Box, Button, Chip, Stack } from "@mui/material";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  cancelTasks,
  useGetQueuedTasks,
  useQueueEvents,
} from "../queue/queueService";
import type { QueueTableData } from "../queue/tableData";
import { QueueStatusBar } from "../queue/pauseButton";

function extractDataFromQueue(): QueueTableData[] {
  const queuedTasks = useGetQueuedTasks();
  let data: QueueTableData[] = [];
  queuedTasks.data?.map((task) =>
    data.push({
      position: task.position,
      id: task.id,
      instrumentSession: task.experiment_definition.instrument_session,
      sampleId: task.experiment_definition.sample_id,
      planRunning: task.experiment_definition.plan_name,
      parameters: JSON.stringify(task.experiment_definition.params),
      //   parameters: task.experiment_definition.params,
      status: task.status,
      blueapi_tasks: task.blueapi_calls,
    }),
  );
  return data;
}

function getChipColorMap() {
  return {
    Waiting: "default",
    Claimed: "warning",
    "In progress": "info",
    Success: "success",
    Complete: "success",
    Error: "error",
    Cancelled: "warning",
  };
}

export function QueueView() {
  useQueueEvents();
  let data = extractDataFromQueue();
  const colorMap = getChipColorMap();

  // NOTE doesn't seem to like that params inevitable ends up being an object
  // A workaround for this is to have them as a string.
  // Could also iterate over them but typing this may become cumbersome with
  // the different plans
  const columns = useMemo<MRT_ColumnDef<QueueTableData>[]>(
    () => [
      { accessorKey: "position", header: "Position", size: 150 },
      {
        accessorKey: "id",
        header: "ID",
        size: 100,
        Cell: ({ cell }) => (
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: 100,
            }}
            title={cell.getValue<string>()}
          >
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "instrumentSession",
        header: "Instrument Session",
        size: 150,
      },
      { accessorKey: "sampleId", header: "Sample ID", size: 150 },
      { accessorKey: "planRunning", header: "Plan", size: 150 },
      { accessorKey: "parameters", header: "Plan parameters", size: 150 },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue<string>()}
            // @ts-ignore
            color={colorMap[cell.getValue<string>()]}
          ></Chip>
        ),
      },
      { accessorKey: "calls", header: "BlueAPI tasks", size: 150 },
      {
        accessorKey: "cancel",
        header: "Actions",
        size: 150,
        Cell: ({ row }) => {
          const task = row.original;
          const isDisabled = task.status != "Queued";
          return (
            <Button
              variant="contained"
              color="error"
              size="small"
              disabled={isDisabled}
              onClick={() => cancelTasks([task.id])}
            >
              Cancel
            </Button>
          );
        },
      },
    ],
    [],
  );
  const table = useMaterialReactTable({ columns, data });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Stack direction={"column"} spacing={4} alignItems={"center"}>
        <QueueStatusBar></QueueStatusBar>
        <MaterialReactTable table={table} />
      </Stack>
    </Box>
  );
}
