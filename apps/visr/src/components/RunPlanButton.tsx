import { Button } from "@mui/material";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [colour, setColour] = useState<any>("primary");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setColour("primary");
    }, 4000);
    return () => clearTimeout(timeout);
  });
  return (
    <Button
      variant="contained"
      loading={loading}
      color={colour}
      sx={{ width: "150px" }}
      onClick={async () => {
        const taskRequest: TaskRequest = {
          name: name,
          params: params,
          instrument_session: instrumentSession,
        };
        setLoading(true);
        const resp = await createAndStartTask(taskRequest);
        if (resp === true) {
          setLoading(false);
          setColour("success");
        } else {
          setLoading(false);
          setColour("error");
        }
      }}
    >
      Run
    </Button>
  );
};

export default RunPlanButton;
