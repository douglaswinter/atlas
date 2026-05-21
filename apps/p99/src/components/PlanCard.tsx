import { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import type { Plan } from "@atlas/blueapi";
import { api } from "../api";

interface PlanCardProps {
  plan: Plan;
  devicesData: any;
  isWorkerRunning: boolean;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export function PlanCard({
  plan,
  devicesData,
  isWorkerRunning,
  onSuccess,
  onError,
}: PlanCardProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);

  const cleanDescription = plan.description?.split(/parameters/i)[0].trim();
  const properties = (plan.schema as any)?.properties || {};
  const requiredFields = (plan.schema as any)?.required || [];

  const handleInputChange = (paramName: string, value: any) => {
    setFormValues(prev => ({ ...prev, [paramName]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const submitResult = await api.tasks.submit({
        name: plan.name,
        params: formValues,
        instrument_session: "p99-session-01",
      });

      await api.worker.setActiveTask(submitResult.task_id);
      onSuccess(`Plan ${plan.name} started successfully!`);
    } catch (err: any) {
      onError(
        err.response?.data?.detail || `Execution failed for ${plan.name}.`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      elevation={2}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "monospace",
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            {plan.name}
          </Typography>
          <Chip label="Python" size="small" variant="outlined" />
        </Stack>

        <Typography
          variant="body2"
          sx={{ mt: 1.5, mb: 2, minHeight: "3em", color: "text.secondary" }}
        >
          {cleanDescription || "No documentation available."}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Accordion
          defaultExpanded={false}
          elevation={0}
          sx={{ bgcolor: "transparent" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CodeIcon fontSize="small" color="action" />
              <Typography variant="subtitle2" fontWeight="bold">
                Configuration
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0 }}>
            <Stack spacing={2}>
              {Object.entries(properties).map(([key, value]: [string, any]) => {
                const isRequired = requiredFields.includes(key);
                const isDevice =
                  key.toLowerCase().includes("device") ||
                  key.toLowerCase().includes("detector");

                return (
                  <TextField
                    key={key}
                    label={key}
                    select={isDevice}
                    fullWidth
                    size="small"
                    required={isRequired}
                    type={
                      value.type === "number" || value.type === "integer"
                        ? "number"
                        : "text"
                    }
                    value={formValues[key] ?? ""}
                    onChange={e => handleInputChange(key, e.target.value)}
                    helperText={value.description}
                    slotProps={{
                      inputLabel: { shrink: true },
                    }}
                  >
                    {isDevice
                      ? devicesData?.devices?.map((d: any) => (
                          <MenuItem key={d.name} value={d.name}>
                            {d.name}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                );
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </CardContent>

      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          startIcon={
            submitting ? <CircularProgress size={20} /> : <PlayArrowIcon />
          }
          onClick={handleSubmit}
          disabled={submitting || isWorkerRunning}
        >
          {submitting ? "Running..." : `Run ${plan.name}`}
        </Button>
      </Box>
    </Card>
  );
}
