# LabTech Script Explorer

Paste LTScript XML, inspect the decoded script, and view it as JSON, a step tree, or plain text before importing into your server.

Built with Vite, React 19, and MUI. Uses [labtech-script-decode](https://github.com/mspgeek/labtech-script-decode) to parse and decode scripts. Static SPA, decoding runs entirely in the browser.

## Live version

https://k-grube.github.io/labtech-script-explorer

## Development

```
npm ci
npm run dev
```

`labtech-script-decode` is consumed via `file:../labtech-script-decode` for local development. Once it's published to npm as `1.0.0`, the dependency gets pinned to `"labtech-script-decode": "1.0.0"` for reproducible installs.

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
