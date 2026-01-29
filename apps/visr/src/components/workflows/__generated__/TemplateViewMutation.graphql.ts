/**
 * @generated SignedSource<<a0a40073a6405ca86d0a1fe3b5c5026e>>
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
export type TemplateViewMutation$variables = {
  parameters: any;
  templateName: string;
  visit: VisitInput;
};
export type TemplateViewMutation$data = {
  readonly submitWorkflowTemplate: {
    readonly name: string;
  };
};
export type TemplateViewMutation = {
  response: TemplateViewMutation$data;
  variables: TemplateViewMutation$variables;
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
    "name": "TemplateViewMutation",
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
    "name": "TemplateViewMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "b9ea26832024cbe126ef60c2639577e9",
    "id": null,
    "metadata": {},
    "name": "TemplateViewMutation",
    "operationKind": "mutation",
    "text": "mutation TemplateViewMutation(\n  $templateName: String!\n  $visit: VisitInput!\n  $parameters: JSON!\n) {\n  submitWorkflowTemplate(name: $templateName, visit: $visit, parameters: $parameters) {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "660c30e6a917a69df3bd2b5cbf6a3379";

export default node;
