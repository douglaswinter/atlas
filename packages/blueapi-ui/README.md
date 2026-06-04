# @atlas/blueapi-ui

This package provides some basic UI components for interaction with blueapi, currently:

- PlanBrowser
- SearchablePlanList
- RunPlanButton

## Installation

```bash
pnpm add -F myApp @atlas/blueapi-ui --workspace
```

## Usage

1. Once installed, you can use the PlanBrowser to display a searchable list of all plans available, and view plan details (currently rendered by JsonForms).

Example:

```ts
import { PlanBrowser } from "@atlas/blueapi-ui";
import { PlanParameters } from "@atlas/blueapi-ui";

function JsonFormsPlans() {
  const { data } = usePlans();

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3, mb: 3 }}>
        <PlanBrowser
          plans={data ? data.plans : []}
          renderPlan={(plan) => <PlanParameters plan={plan} />}
        />
      </Box>
    </>
  );
}

export default JsonFormsPlans;

```

2. Add a mocked response and handler to provide a generic list of plans:

```ts
import plansResponse from "@atlas/blueapi-ui";

export const handlers = [
  http.get("/api/plans", () => {
    return HttpResponse.json(plansResponse);
  }),
];
```
