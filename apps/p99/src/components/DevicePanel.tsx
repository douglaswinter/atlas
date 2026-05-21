import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";

interface DevicePanelProps {
  devicesData: any;
}

export function DevicePanel({ devicesData }: DevicePanelProps) {
  const devices = devicesData?.devices || [];

  return (
    // Cleaned up container: Just a standard block wrapper now
    <Box sx={{ width: "100%" }}>
      <Accordion
        defaultExpanded
        elevation={2}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px !important",
          bgcolor: "background.paper",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SettingsInputComponentIcon color="primary" fontSize="small" />
            <Typography variant="subtitle1" fontWeight="bold">
              Connected Devices ({devices.length})
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {devices.length === 0 ? (
            <Typography variant="body2" color="text.disabled">
              No devices detected on the worker.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                maxHeight: { xs: "150px", md: "calc(100vh - 220px)" },
                overflowY: "auto",
                p: 0.5,
              }}
            >
              {devices.map((device: any) => (
                <Chip
                  key={device.name}
                  label={device.name}
                  variant="outlined"
                  size="small"
                  color="primary"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 500,
                    bgcolor: "grey.50",
                  }}
                />
              ))}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
