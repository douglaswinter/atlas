import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { useToggleQueueState } from "./queueService";

export function QueueControlButton() {
  const { paused, toggle, isLoading, isDisabled } = useToggleQueueState();

  return (
    <Button
      variant="contained"
      color={paused ? "warning" : "success"}
      onClick={toggle}
      disabled={isDisabled}
      startIcon={isLoading ? <CircularProgress size={16} /> : undefined}
    >
      {paused ? "Resume Queue" : "Pause Queue"}
    </Button>
  );
}

export function QueueStatusBar() {
  const { paused } = useToggleQueueState();

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: paused ? "warning.main" : "success.main",
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography
          variant="h6"
          sx={{
            color: paused ? "warning.main" : "success.main",
            fontWeight: 600,
          }}
        >
          Queue {paused ? "Paused" : "Running"}
        </Typography>

        <QueueControlButton />
      </Stack>
    </Box>
  );
}
