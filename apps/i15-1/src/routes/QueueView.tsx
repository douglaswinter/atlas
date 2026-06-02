import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  cancelTasks,
  clearHistory,
  useGetAllTasks,
  useGetQueuedTasks,
  useMoveTask,
  useQueueEvents,
} from "../queue/queueService";
import type { QueueTableData } from "../queue/tableData";
import { QueueStatusPanel } from "../queue/QueueStatusPanel";
import type { QueuedTasks } from "../queue/tasks";
import type { UseQueryResult } from "@tanstack/react-query";

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

  const queuedTasks = useGetQueuedTasks();
  const allTasks = useGetAllTasks();

  const moveTaskMutation = useMoveTask();

  const [showHistoric, setShowHistoric] = useState(false);

  const tasksToDisplay = useMemo<UseQueryResult<QueuedTasks, Error>>(() => {
    if (showHistoric) return allTasks;
    else return queuedTasks;
  }, [queuedTasks, allTasks, showHistoric]);

  const data = useMemo<QueueTableData[]>(() => {
    return (
      tasksToDisplay.data?.map((task) => ({
        position: task.position,
        id: task.id,
        instrumentSession: task.experiment_definition.instrument_session,
        sampleId: task.experiment_definition.sample_id,
        planRunning: task.experiment_definition.plan_name,
        parameters: JSON.stringify(task.experiment_definition.params),
        status: task.status,
        blueapTasks: task.blueapi_calls,
      })) ?? []
    );
  }, [tasksToDisplay.data]);

  const colorMap = useMemo(() => getChipColorMap(), []);

  // NOTE doesn't seem to like that params inevitable ends up being an object
  // A workaround for this is to have them as a string.
  // Could also iterate over them but typing this may become cumbersome with
  // the different plans

  const columns = useMemo<MRT_ColumnDef<QueueTableData>[]>(
    () => [
      { accessorKey: "position", header: "Position", size: 100 },
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
    [colorMap],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowOrdering: true,
    enableRowDragging: true,
    enableSorting: false,
    muiRowDragHandleProps: ({ row, table }) => {
      const isDraggable = row.original.status === "Queued";
      return {
        draggable: isDraggable,
        sx: !isDraggable ? { display: "none" } : undefined,
        onDragEnd: () => {
          const draggedRow = table.getState().draggingRow;
          const targetRow = table.getState().hoveredRow;

          if (!draggedRow || !targetRow) return;

          const draggedTask = draggedRow.original;
          const oldIndex = draggedRow.index;
          const newIndex = targetRow.index;

          if (newIndex === undefined || draggedRow.original.position === null)
            return;

          const newPosition = Math.max(
            draggedRow.original.position + (newIndex - oldIndex),
            0,
          );

          moveTaskMutation.mutate({
            taskId: draggedTask.id,
            newPosition: newPosition,
          });
        },
      };
    },
    renderTopToolbarCustomActions: () => (
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControlLabel
          control={
            <Switch
              checked={showHistoric}
              onChange={(e) => setShowHistoric(e.target.checked)}
            ></Switch>
          }
          label="Show historic tasks"
        ></FormControlLabel>
        <Button
          variant="outlined"
          color="error"
          disabled={!showHistoric}
          onClick={() => clearHistory()}
        >
          Clear History
        </Button>
      </Stack>
    ),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Stack direction={"column"} spacing={4} alignItems={"center"}>
        <QueueStatusPanel />
        <MaterialReactTable table={table} />
      </Stack>
    </Box>
  );
}
