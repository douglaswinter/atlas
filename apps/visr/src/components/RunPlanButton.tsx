import { Button } from "@mui/material";
import { useEffect, useState } from "react";

// import { createAndStartTask, type TaskRequest } from "../utils/api";
import { useScanEvents } from "../hooks/scanEvents";
import { useSetActiveTask, useSubmitTask } from "@atlas/blueapi-query";
import type { TaskRequest } from "@atlas/blueapi";

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

  const submitTask = useSubmitTask();
  const startTask = useSetActiveTask();
  const submitAndRunTask = async (task: TaskRequest) => {
    await submitTask
      .mutateAsync(task)
      .then(response => startTask.mutateAsync(response.task_id));
  };

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
        await submitAndRunTask(taskRequest);
        setLoading(false);
      }}
    >
      Run
    </Button>
  );
};

export default RunPlanButton;
