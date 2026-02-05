import { commitMutation, graphql } from "react-relay";
import type { Environment } from "relay-runtime";
import type {
  submitWorkflowTemplateMutation as SubmitWorkflowType,
  submitWorkflowTemplateMutation$variables as SubmitWorkflowVariables,
} from "./__generated__/submitWorkflowTemplateMutation.graphql";

const mutation = graphql`
  mutation submitWorkflowTemplateMutation(
    $templateName: String!
    $visit: VisitInput!
    $parameters: JSON!
  ) {
    submitWorkflowTemplate(
      name: $templateName
      visit: $visit
      parameters: $parameters
    ) {
      name
    }
  }
`;

/**
 * Submit the workflow. Returns a promise that resolves with the unique workflow run name
 * or rejects with either:
 * - an array of GraphQL errors (GraphQLError[]) or
 * - a network error (Error)
 */
export function submitWorkflowTemplate(
  environment: Environment,
  variables: SubmitWorkflowVariables,
): Promise<{ name: string }> {
  return new Promise((resolve, reject) => {
    commitMutation<SubmitWorkflowType>(environment, {
      mutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors && errors.length > 0) {
          reject(errors); // GraphQL errors
          return;
        }
        if (!response?.submitWorkflowTemplate) {
          // Defensive: unexpected response shape
          reject(new Error("Unexpected response from submitWorkflowTemplate"));
          return;
        }
        resolve(response.submitWorkflowTemplate);
      },
      onError: err => {
        reject(err); // Network or other fatal error
      },
    });
  });
}
