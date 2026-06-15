import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import type { TypedDocumentNode } from "@apollo/client";
import { columns, type ExperimentTableData } from "./columns";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import QueueIcon from "@mui/icons-material/Queue";

type ExperimentDefinitionNode = {
  name: string;
  data: string;
};

type SampleNode = {
  name: string;
  data: string;
};

type ExperimentNode = {
  name: string;
  sample: SampleNode;
  experimentDefinition: ExperimentDefinitionNode;
};

// TODO: Autogenerate these from the schema, see https://github.com/DiamondLightSource/atlas/issues/63
type GetExperimentQueryData = {
  instrumentSession: {
    experiments: {
      edges: {
        node: ExperimentNode;
      }[];
    };
  };
};

type GetExperimentQueryVariables = {
  proposal: number;
  session: number;
};

const convertNodeToTableData = (node: ExperimentNode): ExperimentTableData => ({
  experimentName: node.name,
  sampleName: node.sample.name,
  density: node.sample.data.density,
  composition: node.sample.data.composition,
  beamEnergy: node.experimentDefinition.data.beam_energy,
  timePerPDF: node.experimentDefinition.data.time_per_pdf,
  beamSize: node.experimentDefinition.data.focused_beam_size,
});

const GET_EXPERIMENTS: TypedDocumentNode<
  GetExperimentQueryData,
  GetExperimentQueryVariables
> = gql`
  query GetSessionPlaylist($proposal: Int!, $session: Int!) {
    instrumentSession(
      proposalNumber: $proposal
      instrumentSessionNumber: $session
    ) {
      experiments {
        edges {
          node {
            name
            sample {
              name
              data
            }
            experimentDefinition {
              name
              data
            }
          }
        }
      }
    }
  }
`;

export function ExperimentList() {
  const location = useLocation();

  const { data, loading, error } = useQuery(GET_EXPERIMENTS, {
    variables: {
      proposal: 44163,
      session: 3,
    },
    fetchPolicy: "cache-and-network",
    context: { pathname: location.pathname },
  });

  const experiments = data?.instrumentSession.experiments.edges || [];

  const flatExperiments = useMemo(() => {
    return (experiments ?? []).map((edge) => convertNodeToTableData(edge.node));
  }, [experiments, location.pathname]);

  const table = useMaterialReactTable({
    columns,
    data: flatExperiments,
    enableRowOrdering: false,
    enableRowDragging: false,
    enableRowSelection: true,
    enableSorting: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    renderTopToolbarCustomActions: ({ table }) => {
      const selectedCount = table.getSelectedRowModel().rows.length;

      return (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography variant="h6" component="h1" textAlign={"left"}>
            Experiment Playlist
          </Typography>

          {selectedCount > 0 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const selected = table
                  .getSelectedRowModel()
                  .rows.map((row) => row.original);

                console.log("Selected:", selected);
              }}
            >
              Add selected {selectedCount} to queue
            </Button>
          ) : (
            <Button variant="contained">Add all to queue</Button>
          )}
        </Stack>
      );
    },

    state: {
      isLoading: loading,
      showAlertBanner: !!error,
    },
    muiToolbarAlertBannerProps: error
      ? {
          color: "error",
          children: `Error: ${error.message}`,
        }
      : undefined,
  });

  return <MaterialReactTable table={table} />;
}
