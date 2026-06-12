import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import type { TypedDocumentNode } from "@apollo/client";
import { columns } from "./columns";
import type { ExperimentTableData } from "./columns";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";

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

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const experiments = data?.instrumentSession.experiments.edges || [];

  const flatExperiments = useMemo(() => {
    return (experiments ?? []).map((edge) => convertNodeToTableData(edge.node));
  }, [experiments, location.pathname]);

  const table = useMaterialReactTable({
    columns,
    data: flatExperiments,
    enableRowOrdering: false,
    enableRowDragging: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
  });

  return <MaterialReactTable table={table} />;
}
