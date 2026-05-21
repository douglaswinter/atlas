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
      const processedParams: Record<string, any> = {};

      Object.entries(properties).map(([key, value]: [string, any]) => {
        const userValue = formValues[key];
        if (userValue === undefined || userValue === "") return;

        // Handle parameters expecting an Array (e.g., detectors: ["det1", "det2"])
        if (value.type === "array") {
          if (typeof userValue === "string") {
            // Splits by commas and cleans up whitespace: "det1, det2" -> ["det1", "det2"]
            processedParams[key] = userValue
              .split(",")
              .map(item => item.trim())
              .filter(item => item !== "");
          } else {
            processedParams[key] = [userValue];
          }
        } else if (value.type === "number" || value.type === "integer") {
          processedParams[key] = Number(userValue);
        } else {
          processedParams[key] = userValue;
        }
      });

      const submitResult = await api.tasks.submit({
        name: plan.name,
        params: processedParams,
        instrument_session: "p99-session-01",
      });

      await api.worker.setActiveTask(submitResult.task_id);
      onSuccess(`Plan ${plan.name} started successfully!`);
    } catch (err: any) {
      const errorData = err.response?.data?.detail;
      let userFriendlyMessage = `Execution failed for ${plan.name}.`;

      if (typeof errorData === "string") {
        userFriendlyMessage = errorData;
      } else if (Array.isArray(errorData)) {
        userFriendlyMessage = errorData
          .map((e: any) => {
            const field = e.loc ? e.loc[e.loc.length - 1] : "Parameter";
            return `${field}: ${e.msg}`;
          })
          .join(" | ");
      } else if (errorData && typeof errorData === "object") {
        userFriendlyMessage = errorData.msg || JSON.stringify(errorData);
      }

      onError(userFriendlyMessage);
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
          alignItems="center"
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

        <Divider sx={{ mt: 2 }} />

        <Accordion
          defaultExpanded={false}
          elevation={0}
          sx={{ bgcolor: "transparent" }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CodeIcon fontSize="small" color="action" />
              <Typography variant="subtitle2" fontWeight="bold">
                Configure & View Details
              </Typography>
            </Stack>
          </AccordionSummary>

          <AccordionDetails sx={{ px: 0 }}>
            <Stack spacing={2.5}>
              {cleanDescription && (
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    borderLeft: "3px solid",
                    borderColor: "primary.light",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      mb: 0.5,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Protocol Documentation:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.5 }}
                  >
                    {cleanDescription}
                  </Typography>
                </Box>
              )}

              {Object.entries(properties).map(([key, value]: [string, any]) => {
                const isRequired = requiredFields.includes(key);
                const isDevice =
                  key.toLowerCase().includes("device") ||
                  key.toLowerCase().includes("detector");

                return (
                  <TextField
                    key={key}
                    label={isRequired ? `${key} (Required)` : key}
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
                    helperText={
                      isDevice
                        ? `Enter device ID (e.g., det1). ${value.description || ""}`
                        : value.description
                    }
                    InputLabelProps={{ shrink: true }}
                    placeholder={isDevice ? "e.g., detector_a" : ""}
                    sx={{
                      ...(isRequired && {
                        "& .MuiInputLabel-root": {
                          color: "warning.main",
                          fontWeight: "bold",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(237, 108, 2, 0.5)",
                          },
                          "&:hover fieldset": {
                            borderColor: "warning.main",
                          },
                        },
                      }),
                    }}
                  />
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
