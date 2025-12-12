import { Box, TextField } from "@mui/material";
import { useInstrumentSession } from "../../context/instrumentSession/useInstrumentSession";
import NumberTextField from "./NumberTextField";
import RunPlanButton from "../RunPlanButton";
import { useState } from "react";

export type SpectroscopyFormData = {
  total_number_of_scan_points: number;
  grid_size: number;
  grid_origin_x: number;
  grid_origin_y: number;
  exposure_time: number;
};

export function SpectroscopyForm() {
  const { instrumentSession, setInstrumentSession } = useInstrumentSession();
  const [formData, setFormData] = useState<SpectroscopyFormData>({
    total_number_of_scan_points: 25,
    grid_size: 5.0,
    grid_origin_x: 0.0,
    grid_origin_y: 0.0,
    exposure_time: 0.1,
  });
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
          flexGrow: 1,
        }}
      >
        <NumberTextField
          formData={formData}
          setFormData={setFormData}
          field="grid_origin_x"
          step={0.1}
          label="Grid origin x"
        />
        <NumberTextField
          formData={formData}
          setFormData={setFormData}
          field="grid_origin_y"
          step={0.1}
          label="Grid origin y"
        />
        <NumberTextField
          formData={formData}
          setFormData={setFormData}
          field="grid_size"
          step={0.1}
          label="Grid size"
        />
        <NumberTextField
          formData={formData}
          setFormData={setFormData}
          field="total_number_of_scan_points"
          step={1}
          label="Number of Points"
        />
        <NumberTextField
          formData={formData}
          setFormData={setFormData}
          field="exposure_time"
          step={0.1}
          label="Exposure time"
        />
        <TextField
          fullWidth
          id="instrumentSession"
          label="Instrument Session"
          defaultValue={instrumentSession}
          onChange={e => setInstrumentSession(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 4 }} display={"flex"} justifyContent={"center"}>
        <RunPlanButton
          name="demo_spectroscopy"
          params={formData}
          instrumentSession={instrumentSession}
        />
      </Box>
    </Box>
  );
}
