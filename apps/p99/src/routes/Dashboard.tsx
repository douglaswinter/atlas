import { Container, Typography, Button, Stack } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Link } from "react-router-dom";
import InstrumentSessionView from "../components/InstrumentSessionSelection/InstrumentSessionView";

function Dashboard() {
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5, mb: 4 }}>
        <Stack direction={"column"} alignItems={"center"} spacing={3}>
          <Typography variant="h4" component="h1" textAlign={"center"}>
            P99
          </Typography>
          <Stack direction={"row"} spacing={5}>
            <Button
              component={Link}
              to="/plans"
              variant="contained"
              startIcon={<FeedIcon />}
              sx={{ width: 150, height: 50 }}
            >
              <Typography sx={{ mt: "4px" }}>Plans</Typography>
            </Button>
            <Button
              component={Link}
              to="/workflows"
              variant="contained"
              startIcon={<AddchartIcon />}
              sx={{ width: 150, height: 50, gap: "0.5rem" }}
            >
              <Typography sx={{ mt: "4px" }}>Workflows</Typography>
            </Button>
          </Stack>
          {/* <InstrumentSessionView sessionsList={GetInstrumentSessions()} /> */}
          <InstrumentSessionView sessionsList={["cm44186-1", "cm44186-2"]} />
        </Stack>
      </Container>
    </>
  );
}

export default Dashboard;
