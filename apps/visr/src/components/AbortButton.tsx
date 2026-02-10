import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { setWorkerState, type WorkerRequest } from "../utils/api";
import { useScanEvents } from "../hooks/scanEvents";

const AbortButton = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const scanEvent = useScanEvents();
  useEffect(() => {
    if (!scanEvent) return;
    if (scanEvent.status == "running") {
      setDisabled(false);
    }
    if (scanEvent.status == "finished" || scanEvent.status == "failed") {
      setDisabled(true);
    }
  }, [scanEvent]);
  return (
    <Button
      variant="contained"
      color="error"
      disabled={disabled}
      sx={{ width: "150px" }}
      onClick={async () => {
        const workerRequest: WorkerRequest = {
          new_state: "ABORTING",
          defer: false,
          reason: "UI Intervention",
        };
        await setWorkerState(workerRequest);
      }}
    >
      Abort
    </Button>
  );
};

export default AbortButton;
