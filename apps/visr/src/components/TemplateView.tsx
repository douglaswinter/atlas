import { useState } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { graphql } from "relay-runtime";
import type {
  JSONObject,
  SubmissionGraphQLErrorMessage,
  SubmissionNetworkErrorMessage,
  SubmissionSuccessMessage,
} from "../utils/types";
import { type Visit, visitToText } from "@diamondlightsource/sci-react-ui";
import SubmissionForm from "./SubmissionForm";
import type { TemplateViewQuery as TemplateViewQueryType } from "./__generated__/TemplateViewQuery.graphql";
import type { TemplateViewMutation as TemplateViewMutationType } from "./__generated__/TemplateViewMutation.graphql";
import { visitTextToVisit } from "../utils/common";
import { Box } from "@mui/material";
import SubmittedMessagesList from "./SubmittedMessagesList";

const templateViewQuery = graphql`
  query TemplateViewQuery($templateName: String!) {
    workflowTemplate(name: $templateName) {
      ...workflowTemplateFragment
    }
  }
`;

const templateViewMutation = graphql`
  mutation TemplateViewMutation(
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

export default function TemplateView({
  templateName,
  visit,
  prepopulatedParameters,
}: {
  templateName: string;
  visit?: Visit;
  prepopulatedParameters?: JSONObject;
}) {
  const data = useLazyLoadQuery<TemplateViewQueryType>(templateViewQuery, {
    templateName,
  });
  const [submissionResults, setSubmissionResults] = useState<
    (
      | SubmissionSuccessMessage
      | SubmissionNetworkErrorMessage
      | SubmissionGraphQLErrorMessage
    )[]
  >([]);

  const storedVisit = visitTextToVisit(
    localStorage.getItem("instrumentSessionID") ?? "",
  );

  const [commitMutation] =
    useMutation<TemplateViewMutationType>(templateViewMutation);

  function submitWorkflow(visit: Visit, parameters: object) {
    commitMutation({
      variables: {
        templateName: templateName,
        visit: visit,
        parameters: parameters,
      },
      onCompleted: (response, errors) => {
        if (errors?.length) {
          console.error("GraphQL errors:", errors);
          setSubmissionResults(prev => [
            {
              type: "graphQLError",
              errors: errors,
            },
            ...prev,
          ]);
        } else {
          const submittedName = response.submitWorkflowTemplate.name;
          console.log("Successfully submitted:", submittedName);
          setSubmissionResults(prev => [
            {
              type: "success",
              message: `${visitToText(visit)}/${submittedName}`,
            },
            ...prev,
          ]);
          localStorage.setItem("instrumentSessionID", visitToText(visit));
        }
      },
      onError: err => {
        console.error("Submission failed:", err);
        setSubmissionResults(prev => [
          {
            type: "networkError",
            error: err,
          },
          ...prev,
        ]);
      },
    });
  }
  return (
    <Box>
      <SubmissionForm
        template={data.workflowTemplate}
        prepopulatedParameters={prepopulatedParameters}
        visit={visit ?? storedVisit ?? undefined}
        onSubmit={submitWorkflow}
      />
      <SubmittedMessagesList submissionResults={submissionResults} />
    </Box>
  );
}
