# `@atlas/blueapi-query`

React Query bindings for [`@atlas/blueapi`](/packages/blueapi/README.md).

This package provides typed React hooks built on top of [`@tanstack/react-query`](https://tanstack.com/query) for interacting with blueapi.

It is designed to be used in React applications and depends on a `QueryClientProvider` being configured at the application root.

---

## Installation

```bash
pnpm add --filter appName @atlas/blueapi @atlas/blueapi-query --workspace
pnpm add --filter appName @tanstack/react-query
```

`@atlas/blueapi` and `@tanstack/react-query` are peer dependencies and must be installed by the consuming application.

---

## Setup

1. Create Tanstack query client

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
```

2. Create blueapi API

```typescript
import { createApi } from "@atlas/blueapi";

const api = createApi("/api/blueapi"); // or whatever the endpoint might be
```

3. Wrap application in react-query and blueapi providers

```typescript
import { BlueapiProvider } from "@atlas/blueapi-query";

render(
  <QueryClientProvider client={queryClient}>
    <BlueapiProvider api={api}>
      <App />
    </BlueapiProvider>
  </QueryClientProvider>
);
```

---

## Usage

`@atlas/blueapi-query` exposes hooks corresponding to blueapi resources.

Examples:

```typescript
import { useTasks } from "@atlas/blueapi-query";

function TaskList() {
  const { data, isLoading, error } = useTasks();

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error</>;

  return (
    <ul>
      {data?.tasks.map(task => (
        <li key={task.task_id}>{task.task.name}</li>
      ))}
    </ul>
  );
}
```

A mutation:

```typescript
import type { WorkerStateRequest } from "@atlas/blueapi";
import { useSetWorkerState } from "@atlas/blueapi-query";

function AbortButton() {
  const workerState = useSetWorkerState();
  const abortRequest: WorkerStateRequest = {
    new_state: "ABORTING",
    reason: "User abort",
  };

  return (
    <button onClick={async () => workerState.mutate(abortRequest)}>
      Abort task
    </button>
  );
}
```

All hooks are fully typed and return standard React Query results.
