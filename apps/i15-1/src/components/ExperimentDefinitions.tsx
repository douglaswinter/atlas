import { useQuery } from "@apollo/client/react";
import type { TypedDocumentNode } from "@apollo/client";

import { getSessionPlaylistQuery } from "../graphql/getSessionPlaylistQuery";
import type {
  GetSessionPlaylistQueryVariables,
  GetSessionPlaylistQuery,
} from "../graphql/getSessionPlaylistQuery.generated";

const GET_EXPERIMENTS: TypedDocumentNode<
  GetSessionPlaylistQuery,
  GetSessionPlaylistQueryVariables
> = getSessionPlaylistQuery;

export function ExperimentList() {
  const { data, loading, error } = useQuery(GET_EXPERIMENTS, {
    variables: {
      proposal: 44163,
      session: 3,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const experiments = data?.instrumentSession?.experiments.edges || [];

  return (
    <ul>
      {experiments.map((edge, i) => (
        <li key={i}>{edge.node.name}</li>
      ))}
    </ul>
  );
}
