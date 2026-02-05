/**
 * @generated SignedSource<<bd1bc2c804b6142383c22bcdbb18504a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type InstrumentSessionQuery$variables = {
  instrumentName: string;
};
export type InstrumentSessionQuery$data = {
  readonly instrument: {
    readonly instrumentSessions: ReadonlyArray<{
      readonly instrumentSessionNumber: number;
      readonly proposal: {
        readonly proposalCategory: string | null | undefined;
        readonly proposalNumber: number;
      } | null | undefined;
    }>;
  } | null | undefined;
};
export type InstrumentSessionQuery = {
  response: InstrumentSessionQuery$data;
  variables: InstrumentSessionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "instrumentName"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "instrumentName",
        "variableName": "instrumentName"
      }
    ],
    "concreteType": "Instrument",
    "kind": "LinkedField",
    "name": "instrument",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "InstrumentSession",
        "kind": "LinkedField",
        "name": "instrumentSessions",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "instrumentSessionNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Proposal",
            "kind": "LinkedField",
            "name": "proposal",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "proposalCategory",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "proposalNumber",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InstrumentSessionQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InstrumentSessionQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "625bde94466c698bcacfb6d41e195cbe",
    "id": null,
    "metadata": {},
    "name": "InstrumentSessionQuery",
    "operationKind": "query",
    "text": "query InstrumentSessionQuery(\n  $instrumentName: String!\n) {\n  instrument(instrumentName: $instrumentName) {\n    instrumentSessions {\n      instrumentSessionNumber\n      proposal {\n        proposalCategory\n        proposalNumber\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3cb865e4a1f45b6db5b70c2cb201f4e7";

export default node;
