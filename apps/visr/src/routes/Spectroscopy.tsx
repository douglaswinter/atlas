import { Box } from "@mui/material";
import SpectroscopyForm from "../components/SpectroscopyForm";

function Spectroscopy() {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3 }}>
        <SpectroscopyForm />
      </Box>
    </>
  );
}

export default Spectroscopy;
