import { Button } from "@mui/material";

import { createAndStartTask, type TaskRequest } from "../utils/api";

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
  return (
    <Button
      variant="contained"
      sx={{ width: "150px" }}
      onClick={async () => {
        const taskRequest: TaskRequest = {
          name: name,
          params: params,
          instrument_session: instrumentSession,
        };
        await createAndStartTask(taskRequest);
      }}
    >
      Run
    </Button>
  );
};

export default RunPlanButton;
