# ADR-001: Use Custom Lightweight Buttons Instead of MBA Styleguide

## Status

Accepted

## Context

The consent-manager package needed updated button styling to match the MBA Shopfront design system. The initial approach was to import button components directly from `@muchbetteradventures/styleguide`.

## Decision

We decided to implement custom lightweight button components that visually match the MBA Shopfront Figma design, rather than importing from the styleguide package.

## Rationale

### 1. Peer Dependency Incompatibility

The `@muchbetteradventures/styleguide` package requires peer dependencies that are incompatible with this project:

- **React 18** - consent-manager uses React 16
- **@emotion/react 11.x** - consent-manager uses react-emotion 9.x (legacy Emotion)
- **@emotion/styled 11.x** - not present in consent-manager
- **@mui/material 5.x** - not present in consent-manager

Installing these dependencies would require a major upgrade of the entire project.

### 2. Bundle Size Concerns

The consent-manager is designed as a lightweight, standalone package that can be embedded on any website. The styleguide brings in:

- MUI Material (~300KB+ minified)
- Emotion v11 runtime
- React 18 (if upgraded)
- Various MUI system packages

This would significantly increase the bundle size from ~46KB to potentially 400KB+.

### 3. Build Tooling Incompatibility

The project uses webpack 4 with limited transpilation of node_modules. The styleguide and its dependencies use modern JavaScript syntax:

- Numeric separators (`55_295`)
- Optional chaining (`?.`)
- Nullish coalescing (`??`)

These require either:

- Upgrading to webpack 5
- Adding babel-loader rules to transpile specific node_modules
- Updating the entire build pipeline

### 4. Preact Compatibility

The standalone build aliases React to Preact for bundle size optimization. The styleguide and MUI are not designed to work with Preact and may have runtime incompatibilities.

## Consequences

### Positive

- Bundle size remains small (~46KB)
- No peer dependency conflicts
- No build tooling changes required
- Maintains Preact compatibility for standalone build
- Simpler maintenance with fewer external dependencies

### Negative

- Button styles must be manually kept in sync with Figma design updates
- No automatic design token updates from styleguide
- Duplicated styling code (though minimal)

## Implementation

Custom button components were created in `src/consent-manager/buttons.tsx` matching the Figma design specifications:

| Button              | Background  | Border      | Text    | Font           |
| ------------------- | ----------- | ----------- | ------- | -------------- |
| Primary (MBA Green) | #a0cc3d     | none        | #2a2d2c | Rubik 500/18px |
| Secondary           | #f4f4f4     | 1px #a0cc3d | #2a2d2c | Rubik 500/18px |
| Tertiary            | transparent | none        | #2a2d2c | Rubik 700/12px |

The Rubik font is loaded via Google Fonts using `injectGlobal` from react-emotion.
