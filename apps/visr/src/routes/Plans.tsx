import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getPlans, type PlansResponse } from "../utils/api";
import PlanBrowser from "../components/PlanBrowser/PlanBrowser";
import PlanParameters from "../components/PlanBrowser/PlanParameters";

function JsonFormsPlans() {
  const [planData, setPlanData] = useState<PlansResponse>({ plans: [] });

  useEffect(() => {
    async function fetchPlans() {
      const results = await getPlans();
      setPlanData(results);
    }

    fetchPlans();
  }, []);

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3, mb: 3 }}>
        <PlanBrowser
          plans={planData.plans}
          renderPlan={plan => <PlanParameters plan={plan} />}
        />
      </Box>
    </>
  );
}

export default JsonFormsPlans;
