import { useFragment } from "react-relay";
import { type JSONObject, type Visit } from "../utils/types";
import type { JsonSchema, UISchemaElement } from "@jsonforms/core";
import type { workflowTemplateFragment$key } from "../graphql/__generated__/workflowTemplateFragment.graphql";
import { workflowTemplateFragment } from "../graphql/workflowTemplateFragment";
import TemplateSubmissionForm from "./TemplateSubmissionForm";

const SubmissionForm = (props: {
  template: workflowTemplateFragment$key;
  prepopulatedParameters?: JSONObject;
  visit?: Visit;
  onSubmit: (visit: Visit, parameters: object) => void;
}) => {
  const data = useFragment(workflowTemplateFragment, props.template);
  return (
    <TemplateSubmissionForm
      title={data.title ? data.title : data.name}
      maintainer={data.maintainer}
      repository={data.repository}
      description={data.description ? data.description : undefined}
      parametersSchema={data.arguments as JsonSchema}
      parametersUISchema={data.uiSchema as UISchemaElement}
      visit={props.visit}
      prepopulatedParameters={props.prepopulatedParameters}
      onSubmit={props.onSubmit}
    />
  );
};

export default SubmissionForm;
