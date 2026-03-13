import { Button } from "@mui/material";
import { useState } from "react";

import { useSetActiveTask, useSubmitTask } from "@atlas/blueapi-query";
import type { TaskRequest } from "@atlas/blueapi";
import { useUserAuth } from "../context/userAuth/useUserAuth";

type RunPlanButtonProps = {
  name: string;
  params?: object;
  instrumentSession: string;
  buttonText?: string;
};

const RunPlanButton = ({
  name,
  params,
  instrumentSession,
  buttonText = "Run",
}: RunPlanButtonProps) => {
  const user = useUserAuth();

  const submitTask = useSubmitTask();
  const startTask = useSetActiveTask();
  const submitAndRunTask = async (task: TaskRequest) => {
    await submitTask
      .mutateAsync(task)
      .then((response) => startTask.mutateAsync(response.task_id));
  };

  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = async () => {
    const taskRequest: TaskRequest = {
      name: name,
      params: params,
      instrument_session: instrumentSession,
    };
    setLoading(true);
    await submitAndRunTask(taskRequest);
    setLoading(false);
  };

  const isButtonDisabled = () => {
    const disable =
      user.person == null || user.person == undefined ? true : false;
    return disable;
  };

  return (
    <Button
      variant="contained"
      loading={loading}
      sx={{ width: "150px" }}
      onClick={handleClick}
      disabled={isButtonDisabled()}
    >
      {buttonText}
    </Button>
  );
};

export default RunPlanButton;
