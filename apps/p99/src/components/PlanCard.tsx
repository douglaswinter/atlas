import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";

export const PlanCard = ({ plan }: { plan: any }) => {
  return (
    <Card sx={{ mb: 2, borderLeft: "5px solid #1976d2" }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "monospace", fontWeight: "bold" }}
          >
            {plan.name}()
          </Typography>
          <Chip
            label="Python Plan"
            size="small"
            color="primary"
            variant="outlined"
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontStyle: "italic" }}
        >
          {plan.description || "No description provided."}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* This section handles the "Python-like" function arguments */}
        <Accordion elevation={0} sx={{ "&:before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CodeIcon fontSize="small" />
              <Typography variant="subtitle2">
                Parameters ({Object.keys(plan.schema?.properties || {}).length})
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1}>
              {Object.entries(plan.schema?.properties || {}).map(
                ([key, value]: [string, any]) => (
                  <Stack
                    key={key}
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "600", color: "#d32f2f" }}
                    >
                      {key}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                        bgcolor: "#f5f5f5",
                        px: 1,
                        borderRadius: 1,
                      }}
                    >
                      {value.type}
                    </Typography>
                  </Stack>
                ),
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};
