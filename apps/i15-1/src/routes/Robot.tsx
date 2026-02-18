import { Box, Typography, Stack } from "@mui/material";

function Robot() {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3 }}>
        <Stack direction={"column"} alignItems={"center"} spacing={3}>
          <Typography variant="h4" component="h1" textAlign={"center"}>
            Robot!
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

export default Robot;
