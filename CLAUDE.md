# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **Claude Code skills repository**, not an Angular application. It contains reusable agent skills that teach AI assistants how to build modern Angular (v21–22) applications. The skills live in `.agents/skills/` and are tracked via `skills-lock.json`.

There is no `package.json`, `angular.json`, or application source — the repo is purely skill definitions and reference guides.

## Installed Skills

- **`angular-developer`** — Comprehensive Angular development guidance across 37 reference guides covering signals, forms, routing, testing, styling, and more.
- **`angular-new-app`** — Instructions for scaffolding new Angular applications with the Angular CLI.

Reference guides are in `.agents/skills/angular-developer/references/`.

## Creating Angular Projects with These Skills

When the skills direct you to create a new Angular app:

```bash
npx ng new <project-name> --ai-config=claude --routing --ssr --prefix app
```

Within a generated Angular workspace, the standard commands are:

| Task | Command |
|------|---------|
| Dev server | `ng serve` |
| Build | `ng build` |
| Unit tests | `ng test` |
| E2E tests | `ng e2e` |
| Lint | `ng lint` |
| Generate code | `ng generate component\|service\|directive\|pipe\|guard` |
| Add packages | `ng add <package>` (preferred over `npm install`) |
| Update Angular | `ng update @angular/core@<version> @angular/cli@<version>` |

## Modern Angular Patterns (v21–22)

The skills enforce these patterns. Always apply them in any Angular work.

### Signals (not RxJS/Observables for state)
- `signal()` for writable state, `computed()` for derived state, `linkedSignal()` for derived state that can be manually overridden
- `resource()` for async data fetching with reactive parameters
- `effect()` for side effects (logging, localStorage sync); `afterRenderEffect()` for DOM manipulation

### Components
- **Standalone** by default (no NgModules since v19)
- **Signal inputs**: `input()`, `input.required()`, `model()` — not `@Input()`
- **Signal outputs**: `output()` — not `@Output() EventEmitter`
- **Modern control flow**: `@if`, `@for`, `@switch` — not `*ngIf`, `*ngFor`
- **Dependency injection**: `inject()` function — not constructor injection

### Signal Forms (v21+, from `@angular/forms/signals`)
Critical rules:
- Never use `null` as initial value — use `''`, `0`, `[]` instead
- Access field state by calling it: `field()` returns `FieldState`
- Array `.length` is accessed without calling: `form.items.length` (no parentheses)
- The `submit()` callback **must** be `async`

### Routing
- Functional guards (`CanActivateFn`, `CanMatchFn`, `CanDeactivateFn`) — not class-based
- `ResolveFn` for data pre-fetching
- `provideRouter()` in `ApplicationConfig` — not `RouterModule`

### Testing (Vitest, zoneless)
- Act-Wait-Assert pattern: change state → `await fixture.whenStable()` → assert
- No manual `fixture.detectChanges()` calls in zoneless projects
- Use component harnesses for robust DOM interaction

### Styling
- **Tailwind CSS v4**: `@import 'tailwindcss'` (not `@tailwind base/components/utilities`)
- **View Encapsulation**: Default is `Emulated` (scoped via attributes)
- **Angular Aria** (`@angular/aria`): Headless accessible components — style via ARIA attributes (`[aria-expanded]`, `[aria-selected]`, etc.)
