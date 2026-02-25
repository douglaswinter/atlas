# `@atlas/blueapi`

Lightweight, typed API client for Blueapi.

This package provides:

- a preconfigured Axios client
- domain-organised API modules (`plans`, `devices`, `tasks`, `worker`)
- strongly-typed request/response contracts
- a `createApi()` factory for per-app configuration

This package is transport-focused only.

## Installation

To install it to an application `@atlas/myapp`:

```
pnpm add @atlas/blueapi --filter myapp --workspace
```

## Usage

1. Create the API

```typescript
import { createApi } from "@atlas/blueapi";

const blueapi = createApi("/blueapi");
```

2. Call endpoints

```typescript
// get all plans
const plans = await blueapi.plans.getAll();

// pause running task
const state = await api.worker.setState({ new_state: "PAUSED" });

// etc
```

All methods return `Promise<T>` where `T` is the typed response body.
