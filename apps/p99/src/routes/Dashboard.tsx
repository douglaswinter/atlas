import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stack,
  Grid,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import { usePlans } from "@atlas/blueapi-query";
import type { Plan } from "@atlas/blueapi";

function Dashboard() {
  const { data, isFetching, isError, refetch } = usePlans();

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
      {/* --- HEADER SECTION --- */}
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          P99 Control
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.8 }}>
          Beamline Plan Library
        </Typography>
      </Box>

      {/* --- REFRESH BUTTON --- */}
      <Box display="flex" justifyContent="center" sx={{ mb: 6 }}>
        <Button
          variant="contained"
          onClick={() => refetch()}
          disabled={isFetching}
          size="large"
          sx={{ borderRadius: 8, px: 4, py: 1.5, boxShadow: 3 }}
        >
          {isFetching ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Refresh Available Plans"
          )}
        </Button>
      </Box>

      {/* --- ERROR HANDLING --- */}
      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Unauthorized or Service Unreachable. Please verify your Keycloak
          session and proxy settings.
        </Alert>
      )}

      {/* --- PLANS GRID --- */}
      <Grid container spacing={3}>
        {data?.plans?.map((plan: Plan) => {
          // 1. Clean the description: Remove everything after "Parameters"
          const cleanDescription = plan.description
            ?.split(/parameters/i)[0]
            .trim();

          // 2. Cast schema to 'any' to avoid the "Property properties does not exist" error
          const properties = (plan.schema as any)?.properties;

          return (
            <Grid item xs={12} md={6} key={plan.name}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "monospace",
                        color: "primary.main",
                        fontWeight: "bold",
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Chip label="Python" size="small" variant="outlined" />
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1.5,
                      mb: 2,
                      minHeight: "3em",
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  >
                    {cleanDescription ||
                      "No documentation available for this protocol."}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  {/* --- PARAMETERS ACCORDION --- */}
                  <Accordion
                    elevation={0}
                    disableGutters
                    sx={{ bgcolor: "transparent" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ px: 0 }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CodeIcon fontSize="small" color="action" />
                        <Typography variant="subtitle2">
                          View Function Parameters
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{ px: 2, bgcolor: "action.hover", borderRadius: 1 }}
                    >
                      {properties ? (
                        Object.entries(properties).map(
                          ([key, value]: [string, any]) => {
                            // 1. Check if this specific key is in the 'required' array
                            const isRequired = (
                              plan.schema as any
                            )?.required?.includes(key);

                            return (
                              <Box
                                key={key}
                                sx={{
                                  py: 0.8,
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  alignItems="center"
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: "bold",
                                      fontFamily: "monospace",
                                      color: isRequired
                                        ? "text.primary"
                                        : "text.secondary",
                                    }}
                                  >
                                    {key}
                                  </Typography>

                                  {/* 2. Visual indicator for required fields */}
                                  {isRequired && (
                                    <Typography
                                      variant="caption"
                                      color="error"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      *
                                    </Typography>
                                  )}
                                </Stack>

                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  {/* 3. Optional: Add a "Required" label for extra clarity */}
                                  {isRequired && (
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        fontSize: "0.65rem",
                                        textTransform: "uppercase",
                                        color: "error.main",
                                        fontWeight: "bold",
                                        mr: 1,
                                      }}
                                    >
                                      Required
                                    </Typography>
                                  )}
                                  <Typography
                                    variant="caption"
                                    color="primary"
                                    sx={{ opacity: 0.8 }}
                                  >
                                    {value.type || "any"}
                                  </Typography>
                                </Stack>
                              </Box>
                            );
                          },
                        )
                      ) : (
                        <Typography variant="caption" color="text.disabled">
                          No arguments required for this plan.
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* --- EMPTY STATE --- */}
      {!isFetching && !data?.plans?.length && !isError && (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 4,
            mt: 4,
          }}
        >
          <Typography color="text.disabled">
            No plans detected. Click "Refresh" to query the Blueapi worker.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Dashboard;
