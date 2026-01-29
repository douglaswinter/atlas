/**
 * @generated SignedSource<<eb6c85d3e5731fbc36fe9b45f460ecbe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TemplateViewQuery$variables = {
  templateName: string;
};
export type TemplateViewQuery$data = {
  readonly workflowTemplate: {
    readonly " $fragmentSpreads": FragmentRefs<"workflowTemplateFragment">;
  };
};
export type TemplateViewQuery = {
  response: TemplateViewQuery$data;
  variables: TemplateViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "templateName"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "name",
    "variableName": "templateName"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TemplateViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "WorkflowTemplate",
        "kind": "LinkedField",
        "name": "workflowTemplate",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "workflowTemplateFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TemplateViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "WorkflowTemplate",
        "kind": "LinkedField",
        "name": "workflowTemplate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "maintainer",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "arguments",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "uiSchema",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "repository",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9fb9e57ce71efced848172180274ed2a",
    "id": null,
    "metadata": {},
    "name": "TemplateViewQuery",
    "operationKind": "query",
    "text": "query TemplateViewQuery(\n  $templateName: String!\n) {\n  workflowTemplate(name: $templateName) {\n    ...workflowTemplateFragment\n  }\n}\n\nfragment workflowTemplateFragment on WorkflowTemplate {\n  name\n  maintainer\n  title\n  description\n  arguments\n  uiSchema\n  repository\n}\n"
  }
};
})();

(node as any).hash = "907837f3f9cf4408bf964271f9a981d1";

export default node;
