import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  useConnected,
  useGetQueuedTasks,
  useToggleQueueState,
} from "./queueService";

export function QueueControlButton() {
  const { paused, toggle, isLoading, isDisabled } = useToggleQueueState();
  const { connected } = useConnected();

  return (
    <Button
      variant="contained"
      color={!connected ? "error" : paused ? "warning" : "success"}
      onClick={toggle}
      disabled={!connected}
      startIcon={isLoading ? <CircularProgress size={16} /> : undefined}
    >
      {paused ? "Resume Queue" : "Pause Queue"}
    </Button>
  );
}

export function QueueStatusPanel() {
  const { paused } = useToggleQueueState();
  const queuedTasks = useGetQueuedTasks();
  const empty = !queuedTasks.data || queuedTasks.data.length === 0;
  const { connected } = useConnected();

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: !connected
          ? "error.main"
          : paused
            ? "warning.main"
            : "success.main",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography
          variant="h6"
          sx={{
            color: !connected
              ? "error.main"
              : paused
                ? "warning.main"
                : "success.main",
            fontWeight: 600,
          }}
        >
          Queue{" "}
          {!connected
            ? "Not Connected"
            : empty
              ? "Finished"
              : paused
                ? "Paused"
                : "Running"}
        </Typography>

        <QueueControlButton />
      </Stack>
    </Box>
  );
}
