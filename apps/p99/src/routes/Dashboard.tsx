import { Box, Container, Typography } from "@mui/material";

function Dashboard() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" component="h1">
          P99
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Minimal P99
        </Typography>
      </Box>
    </Container>
  );
}

export default Dashboard;
