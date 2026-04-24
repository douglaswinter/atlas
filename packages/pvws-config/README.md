# `@atlas/pvws-config`

## Installation

To install it to an application `@atlas/myapp`:

```
pnpm add @atlas/pvws-config --filter myapp --workspace
```

## Usage

1. Add a `pvwsconfig.json` configuration file

This file should hold the basic configuration parameters to connect to PVWS and should be located in the `public` folder of your app (or anywhere accessible at runtime).

```json
{
  "PVWS_SOCKET": "pvws.diamond.ac.uk",
  "PVWS_SSL": true,
  "THROTTLE_PERIOD": 100
}
```

2. Set the environment variables

In your app, add the following environment variables to `vite.confg.ts`

```typescript
"process.env": {
    VITE_PVWS_SOCKET: "pvws.diamond.ac.uk",
    VITE_PVWS_SSL: "true",
},
```

3.
