# `@atlas/pvws-config`

Wrapper around `@diamondlightsource/cs-web-lib` to allow read-only access to PVs via connection to PVWS.

This package provides:

- a hook to load the pvws configuration for connection set up
- functions to read and parse PV values
- a default ReadOnlyPv component to display a label/value pair in a mui Box

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

3. Load the configuration

This package provides a hook (`useLoadPvwsConfig`) to load the configuration at the root of your app. Once that's done, you'll need to wrap your app in a react-redux `Provider` to which the loaded configuration is passed.

In `main.tsx`:

```typescript

import { store } from "@diamondlightsource/cs-web-lib";
import { Provider } from "react-redux";
import { useLoadPvwsConfig } from "@atlas/pvws-config";


function App() {
    const config = useLoadPvwsConfig();

    return (
        <Provider store={store(config)}>
            ...
            <RouterProvider router={router}>
            ...
        </Provider>
    );
}
```
