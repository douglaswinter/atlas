import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import { createAndStartTask, type TaskRequest } from "../utils/api";
import { useScanEvents } from "../hooks/scanEvents";

type RunPlanButtonProps = {
  name: string;
  params: object;
  instrumentSession: string;
};

const RunPlanButton = ({
  name,
  params,
  instrumentSession,
}: RunPlanButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const scanEvent = useScanEvents();
  useEffect(() => {
    if (!scanEvent) {
      setDisabled(false);
      return;
    }
    if (scanEvent.status == "running") {
      setDisabled(true);
    }
    if (scanEvent.status == "finished" || scanEvent.status == "failed") {
      setDisabled(false);
    }
  }, [scanEvent]);
  return (
    <Button
      variant="contained"
      loading={loading}
      disabled={disabled}
      sx={{ width: "150px" }}
      onClick={async () => {
        const taskRequest: TaskRequest = {
          name: name,
          params: params,
          instrument_session: instrumentSession,
        };
        setLoading(true);
        await createAndStartTask(taskRequest);
        setLoading(false);
      }}
    >
      Run
    </Button>
  );
};

export default RunPlanButton;
