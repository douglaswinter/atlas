import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Paper, Alert, Typography } from "@mui/material";
import { useAuth } from "@diamondlightsource/sci-react-ui";

export interface TabDescription {
  label: string;
  path: string;
}

export interface TabbedPanelProps {
  skipAuth?: boolean;
  tabs: TabDescription[];
  basePath: string;
}

/** An outlet for tabbed pages */
export function TabbedPanel({ skipAuth, tabs, basePath }: TabbedPanelProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab =
    tabs.find((tab) => location.pathname.startsWith(`${basePath}/${tab.path}`))
      ?.path ?? false;

  const handleChange = (_: React.SyntheticEvent, value: string) => {
    navigate(`${basePath}/${value}`);
  };

  if (!skipAuth) {
    const auth = useAuth();

    if (auth.errors) {
      return <Alert severity="error">{auth.errors.join(", ")}</Alert>;
    }

    if (!auth.authenticated) {
      return (
        <Alert severity="info">You must be logged in to view this page.</Alert>
      );
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        minHeight: 0,
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.path}
              label={tab.label}
              value={tab.path}
              aria-label={tab.label}
            />
          ))}
        </Tabs>
      </Paper>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          p: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
