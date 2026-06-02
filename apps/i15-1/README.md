# i15-1 App

The initial aim of this app to provide a science facing UI for the waffle project. As more features are added that have generic use they should be pulled into more common areas.

## Running Locally

To run this locally:

1.  Start the devcontainer in VSCode
2.  To make sure you have the most up-to-date environment either run `pnpm install` in the container or rebuild the container (via the Ctrl+Shift+P menu in VSCode)
3.  In a terminal in this devcontainer run either:
    - `VITE_QUEUE_MODE=local turbo dev --filter @atlas/i15-1` if running a local queue server on http://127.0.0.1:8001, **OR**
    - `turbo dev --filter @atlas/i15-1` to use mocked backends
4.  Navigate to http://localhost:5173/
