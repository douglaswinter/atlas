import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography } from "@mui/material";


export function AuthFallbackScreen() {
  return (
    <Box alignContent={"center"}>
      <ErrorOutlineIcon color="error" fontSize="large" />
      <Typography component="h1" variant="h4">
        Something went wrong with authentication!
      </Typography>
    </Box>
  );
}