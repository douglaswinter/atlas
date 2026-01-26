import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import sanitizeSchema from "../../utils/schema";
import type { Plan } from "../../utils/api";
import RunPlanButton from "../RunPlanButton";
import { useInstrumentSession } from "../../context/instrumentSession/useInstrumentSession";

import { ErrorBoundary } from "react-error-boundary";

/**
 * If the UI generation fails, we show a simple apology
 */
function UIFallback() {
  return (
    <Typography component="h1" variant="h5">
      UI unavailable
    </Typography>
  );
}
type PlanParametersProps = {
  plan: Plan;
};

const PlanParameters: React.FC<PlanParametersProps> = (
  props: PlanParametersProps,
) => {
  const schema = sanitizeSchema(props.plan.schema);

  // const renderers = materialRenderers;
  const [planParameters, setPlanParameters] = useState({});
  const { instrumentSession, setInstrumentSession } = useInstrumentSession();

  return (
    <ErrorBoundary FallbackComponent={UIFallback} resetKeys={[props.plan.name]}>
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        {props.plan.name}
      </Typography>
      {props.plan.description && (
        <Typography pt={2} pb={4}>
          {props.plan.description}
        </Typography>
      )}
      <JsonForms
        schema={schema}
        data={planParameters}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setPlanParameters(data)}
      />
      <TextField
        id="instrumentSession"
        label="Instrument Session"
        defaultValue={instrumentSession}
        onChange={e => setInstrumentSession(e.target.value)}
      ></TextField>
      <Box sx={{ mt: 2 }}>
        <RunPlanButton
          name={props.plan.name}
          params={planParameters}
          instrumentSession={instrumentSession}
        />
      </Box>
    </ErrorBoundary>
  );
};

export default PlanParameters;
