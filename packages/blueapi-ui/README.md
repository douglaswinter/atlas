# @atlas/blueapi-ui

Some description here.

## Installation

```bash
pnpm add -F myApp @atlas/blueapi-ui --workspace
```

## Usage

Do a thing

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

Add a mocked response and handler

```ts
import plansResponse from "@atlas/blueapi-ui";

export const handlers = [
  http.get("/api/plans", () => {
    return HttpResponse.json(plansResponse);
  }),
];
```
