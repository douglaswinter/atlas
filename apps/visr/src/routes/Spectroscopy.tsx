import { Box } from "@mui/material";
import SpectroscopyView from "../components/spectroscopy/SpectroscopyView";

function Spectroscopy() {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3 }}>
        <SpectroscopyView />
      </Box>
    </>
  );
}

export default Spectroscopy;
