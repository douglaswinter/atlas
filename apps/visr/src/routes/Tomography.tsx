import { Box } from "@mui/material";
import TomographyView from "../components/tomography/TomographyView";

function Tomography() {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3 }}>
        <TomographyView />
      </Box>
    </>
  );
}

export default Tomography;
