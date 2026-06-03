import { Box } from "@mui/material";
import { PlanBrowser } from "@atlas/blueapi-ui";
import { PlanParameters } from "@atlas/blueapi-ui";
import { usePlans } from "@atlas/blueapi-query";

function JsonFormsPlans() {
  const { data } = usePlans();

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3, mb: 3 }}>
        <PlanBrowser
          plans={data ? data.plans : []}
          renderPlan={(plan) => <PlanParameters plan={plan} />}
        />
      </Box>
    </>
  );
}

export default JsonFormsPlans;
