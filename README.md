# Cinna Design

Cinna Design is a cloud-soft dessert themed React component library. The first design direction is **milk-cloud blue, cream surfaces, cocoa text, rounded touch targets, and soft handmade motion**.

This repository is maintained as a monorepo, but the public package is intentionally unified:

- `@cinna-design/react` - the only package intended for external installation.
- `@cinna-design/tokens` - private workspace package for internal design tokens.
- `@cinna-design/icons` - private workspace package for internal SVG icons.
- `@cinna-design/site` - private intro site published to GitHub Pages.

## Consumer Package

Application users only need the React package:

```bash
pnpm add @cinna-design/react
```

Import the component styles once:

```ts
import '@cinna-design/react/style.css';
```

## First Prototype

The first prototype intentionally keeps the component set small:

- `Button`
- `Card`
- `Input`
- `CinnaLoading`
- `ConfigProvider`

The goal is to validate the visual language before expanding toward an Ant Design-like coverage map.

## Local Commands

```bash
pnpm install
pnpm build
pnpm test
pnpm dev
```

## GitHub Pages

The public intro site is built from `apps/site`.

```bash
pnpm build:pages
```

The Pages build uses `/cinna-design/` as the asset base so it can be published at:

```text
https://icelemon233.github.io/cinna-design/
```

After the empty GitHub repository exists, publish only the built static site to the `gh-pages` branch:

```bash
pnpm deploy:pages
```

## Design Promise

Cinna Design is not a clone of any existing component library. It borrows the discipline of mature application UI kits, then adds a distinct cloud-dessert identity through tokens, motion, illustrations, and a few signature components.
