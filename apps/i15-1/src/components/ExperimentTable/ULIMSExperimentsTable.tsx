import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import type { TypedDocumentNode } from "@apollo/client";
import { columns } from "./columns";
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

const flatten = (node: ExperimentNode) => ({
  name: node.name,
  sampleName: node.sample.name,
  density: node.sample.data.density,
  capillary: node.sample.data.capillary,
  composition: node.sample.data.composition,
  packing_fraction: node.sample.data.packing_fraction,
  experimentDefinitionName: node.experimentDefinition.name,
  q_max: node.experimentDefinition.data.q_max,
  frames: node.experimentDefinition.data.frames,
  beam_energy: node.experimentDefinition.data.beam_energy,
  time_per_pdf: node.experimentDefinition.data.time_per_pdf,
  focused_beam_size: node.experimentDefinition.data.focused_beam_size,
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
  const { data, loading, error } = useQuery(GET_EXPERIMENTS, {
    variables: {
      proposal: 44163,
      session: 3,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const experiments = data?.instrumentSession.experiments.edges || [];

  const flatExperiments = experiments.map((edge) => flatten(edge.node));

  return (
    <MaterialReactTable
      columns={columns}
      data={flatExperiments}
      enableColumnResizing
      enableSorting
    />
  );
}
