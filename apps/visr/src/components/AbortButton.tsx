import { Button } from "@mui/material";

import { setWorkerState, type WorkerRequest } from "../utils/api";

const AbortButton = () => {
  return (
    <Button
      variant="contained"
      color="error"
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
