import { submitWorkflowTemplate } from "../graphql/submitWorkflowTemplate";
import type { VisitInput } from "../graphql/__generated__/workflowsQuery.graphql";
import { RelayEnvironment } from "../RelayEnvironment";

/**
 * Returns a function (visit, parameters) => Promise<{name: string}>
 * that components can call to submit a workflow with the given templateName
 */
export function useSubmitWorkflow(templateName: string) {
  return (visit: VisitInput, parameters: object) => {
    return submitWorkflowTemplate(RelayEnvironment, {
      templateName,
      visit,
      parameters,
    });
  };
}
