import { useState } from "react";
import { Box, Container, Alert, Grid2 } from "@mui/material";
import { usePlans, useDevices } from "@atlas/blueapi-query";
import type { Plan } from "@atlas/blueapi";

import { useWorkerStatus } from "../hooks/useWorkerStatus";
import { WorkerStatusBar } from "../components/WorkerStatusBar";
import { PlanCard } from "../components/PlanCard";

function Dashboard() {
  const { data: plansData, isFetching, isError, refetch } = usePlans();
  const { data: devicesData } = useDevices();

  const { workerState, activeTaskId } = useWorkerStatus();

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 6 }}>
      <WorkerStatusBar
        workerState={workerState}
        activeTaskId={activeTaskId}
        isFetching={isFetching}
        onSync={refetch}
      />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {feedback && (
          <Alert
            severity={feedback.type}
            sx={{ mb: 3 }}
            onClose={() => setFeedback(null)}
          >
            {feedback.msg}
          </Alert>
        )}

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Unauthorized or Service Unreachable. Check proxy configs or Keycloak
            authentication.
          </Alert>
        )}

        <Grid2 container spacing={3}>
          {plansData?.plans?.map((plan: Plan) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={plan.name}>
              <PlanCard
                plan={plan}
                devicesData={devicesData}
                isWorkerRunning={workerState === "RUNNING"}
                onSuccess={msg => setFeedback({ type: "success", msg })}
                onError={msg => setFeedback({ type: "error", msg })}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}

export default Dashboard;
