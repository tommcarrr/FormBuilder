# AI Implementation Agents

The application itself does **not** contain any AI features.  
These roles are for an external AI agent that will implement and maintain the codebase.

## Global Principles

- Keep it simple. This is a POC, not a full product.
- Prefer explicit, readable TypeScript over clever tricks.
- Use Ant Design components and layout by default; only add custom CSS where absolutely necessary.
- Keep the form schema as the single source of truth.
- When in doubt between “generic abstraction” and “just make it work clearly”, choose the latter.

---

## 1. ArchitectAgent

**Goal:** Define and maintain the overall architecture and form schema.

**Responsibilities:**

- Confirm and maintain:
  - Project structure (see README)
  - Core domain model (form schema types) in `src/form-schema/types.ts`
- Ensure:
  - Builder panel and preview panel share the same `FormDefinition` model
  - Conditional logic is part of the schema, not bolted on
- Keep `docs/spec.md` in sync when scope or structure changes.

**Key Outputs:**

- `src/form-schema/types.ts`
- `src/form-schema/defaultSchema.ts`
- Updates to `docs/spec.md` when necessary

---

## 2. SetupAgent

**Goal:** Create the working baseline project.

**Responsibilities:**

- Scaffold a Vite + React + TypeScript project.
- Add and configure Ant Design.
- Add a minimal global layout:
  - Two-panel split
  - Left: Form Builder placeholder
  - Right: Preview placeholder
- Add minimal custom CSS in `src/styles/layout.css`.
- Add Dockerfile and `docker-compose.yml` that:
  - Build the app
  - Serve the built static assets

**Key Outputs:**

- `package.json` with relevant dependencies
- `src/main.tsx`, `src/App.tsx`, basic layout
- `src/styles/layout.css`
- `Dockerfile` and `docker-compose.yml`

---

## 3. BuilderUIAgent

**Goal:** Implement the functional Form Builder panel.

**Responsibilities:**

- Implement:
  - Palette of form/layout elements
  - Canvas area that shows the current form (tree of elements)
- Implement drag-and-drop for:
  - Adding new elements from palette to canvas
  - Reordering elements within a container
  - Moving elements between containers
- Represent the form on the canvas according to `FormDefinition`.

**Constraints:**

- Can use a drag-and-drop library (e.g. `@hello-pangea/dnd` or similar).
- Prefer simplest possible implementation that is acceptable for a POC.

**Key Outputs:**

- `src/components/FormBuilderPanel/*`
- Palette and canvas components wired to shared form state

---

## 4. PropertyEditorAgent

**Goal:** Implement the properties panel for editing elements.

**Responsibilities:**

- Implement a property editor that:
  - Shows the currently selected element
  - Renders fields conditionally based on element type
- Editable properties include:
  - Generic:
    - `label` (where relevant)
    - `key` (for controls; must be unique; simple uniqueness check)
    - `visibilityRule` (delegates to ConditionalLogicAgent’s model)
  - Controls:
    - `required`
    - `placeholder`
    - `helperText`
    - `options` for select/radio/checkbox group
  - Layout:
    - Section title
    - Grid column span (1–24)
  - Text block:
    - Text content
  - Spacer:
    - Height (px)

**Key Outputs:**

- `src/components/PropertyEditor/*`
- Utility functions for updating `FormDefinition` immutably

---

## 5. PreviewAgent

**Goal:** Implement the live preview panel that renders the form.

**Responsibilities:**

- Consume `FormDefinition` and render:
  - Layout elements with Ant Design `Row` / `Col` where appropriate
  - Controls using Ant Design form inputs:
    - Text input → `Input`
    - Text area → `Input.TextArea`
    - Number → `InputNumber`
    - Select → `Select`
    - Radio group → `Radio.Group`
    - Checkbox → `Checkbox` / `Checkbox.Group`
    - Date → `DatePicker`
- Maintain form values using Ant Design `Form`’s state.
- Apply conditional visibility:
  - Evaluate visibility rules per element based on current form values.
  - Don’t render elements that fail their visibility rule.

**Key Outputs:**

- `src/components/FormPreviewPanel/*`
- A small renderer helper in `src/form-schema/renderer.ts` (or equivalent)

---

## 6. ConditionalLogicAgent

**Goal:** Implement the conditional visibility model and evaluation.

**Responsibilities:**

- Define types (in `types.ts`), for example:

  ```ts
  export type ComparisonOperator =
    | 'equals'
    | 'notEquals'
    | 'contains'
    | 'greaterThan'
    | 'lessThan';

  export interface VisibilityCondition {
    targetFieldKey: string;
    operator: ComparisonOperator;
    value: any;
  }

  export interface VisibilityRule {
    conditions: VisibilityCondition[];
    conjunction: 'AND' | 'OR';
  }
  ```

- Implement evaluation for a rule given current values.
- Integrate with:
  - Preview panel (to show/hide elements)
  - Property editor (configuration UI for rules)

**Key Outputs:**

- `src/form-schema/conditionalLogic.ts`
- Conditional logic configuration components in Property Editor

---

## 7. CodeViewAgent

**Goal:** Implement JSON code view.

**Responsibilities:**

- Add a toggle (tabs or switch) in the builder panel to switch between:
  - Visual builder view
  - JSON view
- JSON view:
  - Shows formatted JSON representation of `FormDefinition`
  - Read-only (for POC)
- Make sure the JSON always reflects current state.

**Key Outputs:**

- `src/components/CodeViewToggle/*`
- `src/form-schema/serializer.ts`

---

## 8. QAAAgent

**Goal:** Validate correctness, basic robustness and UX.

**Responsibilities:**

- Validate each user story in `docs/stories.md`:
  - Happy path and obvious edge cases
- Ensure:
  - `npm run build` succeeds
  - Docker image builds and runs via `docker-compose`
  - No obvious runtime errors or React warnings in the console
  - Layout remains usable at standard desktop resolutions

**Key Outputs:**

- Fixes and small refactors
- Potential updates to `docs/spec.md` if requirements evolve
