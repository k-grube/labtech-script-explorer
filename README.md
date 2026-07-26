# LabTech Script Explorer

Paste LTScript XML, inspect the decoded script, and view it as JSON, a step tree, or plain text before importing into your server.

Built with Vite, React 19, and MUI. Uses [labtech-script-decode](https://github.com/mspgeek/labtech-script-decode) to parse and decode scripts.

0.5.0 dropped the Express API server and Heroku deployment; the app is now a static SPA served from gh-pages.

## Live version

https://k-grube.github.io/labtech-script-explorer

## Development

```
npm ci
npm run dev
```

`labtech-script-decode` is consumed via `file:../labtech-script-decode` for local development. Once it's published to npm as `0.8.0`, the dependency gets pinned to `"labtech-script-decode": "0.8.0"` for reproducible installs.

## Test

```
npm test
```

## Build

```
npm run build
```

Outputs a static production build to `dist/`.

## Deploy

```
npm run deploy
```

Publishes `dist/` to the `gh-pages` branch, live at https://k-grube.github.io/labtech-script-explorer.
