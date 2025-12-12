/**
 * @generated SignedSource<<4f6547654b801b006d483c984e5808e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type VisitInput = {
  number: number;
  proposalCode: string;
  proposalNumber: number;
};
export type submitWorkflowTemplateMutation$variables = {
  parameters: any;
  templateName: string;
  visit: VisitInput;
};
export type submitWorkflowTemplateMutation$data = {
  readonly submitWorkflowTemplate: {
    readonly name: string;
  };
};
export type submitWorkflowTemplateMutation = {
  response: submitWorkflowTemplateMutation$data;
  variables: submitWorkflowTemplateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "parameters"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "templateName"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "visit"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "templateName"
      },
      {
        "kind": "Variable",
        "name": "parameters",
        "variableName": "parameters"
      },
      {
        "kind": "Variable",
        "name": "visit",
        "variableName": "visit"
      }
    ],
    "concreteType": "Workflow",
    "kind": "LinkedField",
    "name": "submitWorkflowTemplate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "submitWorkflowTemplateMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "submitWorkflowTemplateMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "7d09d16bd3f1a6868e61ed6912292072",
    "id": null,
    "metadata": {},
    "name": "submitWorkflowTemplateMutation",
    "operationKind": "mutation",
    "text": "mutation submitWorkflowTemplateMutation(\n  $templateName: String!\n  $visit: VisitInput!\n  $parameters: JSON!\n) {\n  submitWorkflowTemplate(name: $templateName, visit: $visit, parameters: $parameters) {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "e2ff0d748606ea7f1c8e6dd7daae9206";

export default node;
