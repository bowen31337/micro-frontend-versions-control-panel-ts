# Micro Frontend remote versions control panel example in typescript (CRA)

This example demos a basic host application loading remote component per version.

- `host` is the host application (cra-based).
- `remote` standalone application (cra-based) which exposes `Button` component in 2 versions.

# Running Demo

Run `yarn start`. This will build and serve both `host` and `remote` on ports 3001 and 3002 respectively.

- [localhost:3001](http://localhost:3000/) (HOST)
- [localhost:3002](http://localhost:3002/) (STANDALONE REMOTE)
