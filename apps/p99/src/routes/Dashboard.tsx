import {
  Container,
  Typography,
  Stack,
  Paper,
  Grid,
  Box,
  alpha,
  Tooltip,
  Zoom,
  Fade,
  SvgIcon,
  type SvgIconProps,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import FeedIcon from "@mui/icons-material/Feed";
import AddchartIcon from "@mui/icons-material/Addchart";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { Link } from "react-router-dom";
import InstrumentSessionView from "../components/InstrumentSessionSelection/InstrumentSessionView";

interface NavCardProps {
  to: string;
  title: string;
  icon: React.ReactNode;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

function NavCard({ to, title, icon, color = "primary" }: NavCardProps) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper
        component={Link}
        to={to}
        elevation={0}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme =>
              `0 10px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
            borderColor: "primary.main",
            bgcolor: theme => alpha(theme.palette.primary.main, 0.02),
          },
        }}
      >
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: theme => alpha(theme.palette[color].main, 0.1),
            color: `${color}.main`,
          }}
        >
          {icon}
        </Box>
        <Typography variant="subtitle1" fontWeight="600" color="text.primary">
          {title}
        </Typography>
      </Paper>
    </Grid>
  );
}
function P99Icon({ sx, ...props }: SvgIconProps) {
  return (
    <SvgIcon sx={sx} {...props} viewBox="0 0 24 24">
      {/* The Walther P99 silhouette path */}
      <path d="M21,10.5L21,8.5L7,8.5L7,5L4,5L3,6L3,11L4,12L7,12L7,10.5L21,10.5M7,12L7,18L10,21L12,21L12,12L7,12Z" />
    </SvgIcon>
  );
}
function Dashboard() {
  const [clickCount, setClickCount] = useState(0);
  const capCount = 99;
  const handleIconClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === capCount) {
      document.title = "ACCESS GRANTED - 007";
      console.log("Welcome to Q-Branch, Agent 007.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={6}>
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Tooltip
            title="Q-Branch Verified"
            slots={{ transition: Zoom }}
            arrow
            placement="top"
          >
            <Box onClick={handleIconClick} sx={{ cursor: "pointer" }}>
              <P99Icon
                sx={{
                  fontSize: 50,
                  mb: 1,
                  color: clickCount >= capCount ? "error.main" : "primary.main",
                  transform:
                    clickCount >= capCount
                      ? "rotate(-15deg) scale(1.2)"
                      : "rotate(0deg)",
                  transition: "all 0.1s ease-out",
                  "&:active": {
                    transform: "rotate(-20deg) scale(0.9)",
                  },
                }}
              />
            </Box>
          </Tooltip>

          <Typography variant="h3" component="h1" fontWeight="800" gutterBottom>
            P99
            <Tooltip
              title="9mm Reliability"
              placement="right"
              slots={{ transition: Fade }}
            >
              <Box
                component="span"
                sx={{
                  cursor: "help",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {" "}
                Beamline Control Center
              </Box>
            </Tooltip>
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 500,
              mx: "auto",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            {clickCount >= capCount
              ? "Welcome to Q-Branch, 007. The world is not enough, but Diamond is a start."
              : "The most reliable and innovative weapon for diamond."}
            <Box
              component="span"
              sx={{
                display: "block",
                fontSize: "0.7rem",
                mt: 1,
                opacity: 0.4,
                letterSpacing: 1,
              }}
            >
              UNIT ID: P99 AS001
            </Box>
          </Typography>
        </Box>

        {/* Action Grid */}
        <Grid container spacing={3} justifyContent="center">
          <NavCard
            to="/tomography"
            title="Tomography"
            icon={<ArticleIcon fontSize="large" />}
          />

          <NavCard
            to="/plans"
            title="Plans"
            icon={<FeedIcon fontSize="large" />}
          />
          <NavCard
            to="/workflows"
            title="Workflows"
            icon={<AddchartIcon fontSize="large" />}
          />
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: "grey.50",
            border: "1px dashed",
            borderColor: "grey.300",
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="700" sx={{ mb: 3 }}>
            Active Instrument Sessions
          </Typography>
          <InstrumentSessionView sessionsList={["cm44186-1", "cm44186-2"]} />
        </Paper>
      </Stack>
    </Container>
  );
}

export default Dashboard;
