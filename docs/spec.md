# Form Builder POC – Functional and Technical Specification

The app has **no AI features**. It is a pure front-end form builder.  
The AI is used externally to implement and maintain the codebase.

---

## 1. Goals

- Provide a two-panel UI:
  - **Left:** Visual form builder with drag-and-drop, properties, and JSON view
  - **Right:** Live preview of the rendered form
- Represent the form as a **single JSON schema** (TypeScript-based)
- Support **conditional visibility** of elements
- Provide a **clean, modern** UI with minimal custom CSS
- Build and run via **Docker** and **docker-compose**

---

## 2. Form Schema

The schema is the single source of truth for the form.  
It is stored and mutated in React state and can be serialized to JSON.

### 2.1 Types

File: `src/form-schema/types.ts`

```ts
export type ElementType =
  | 'textInput'
  | 'textArea'
  | 'number'
  | 'select'
  | 'radioGroup'
  | 'checkbox'
  | 'checkboxGroup'
  | 'date'
  | 'section'
  | 'gridRow'
  | 'gridColumn'
  | 'textBlock'
  | 'spacer';

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

export interface BaseElement {
  id: string;
  type: ElementType;
  key?: string;               // For data-bearing fields
  label?: string;
  visibilityRule?: VisibilityRule;
}

export interface ControlElement extends BaseElement {
  type:
    | 'textInput'
    | 'textArea'
    | 'number'
    | 'select'
    | 'radioGroup'
    | 'checkbox'
    | 'checkboxGroup'
    | 'date';
  key: string;                 // Required for controls
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: { value: string; label: string }[]; // For select, radioGroup, checkboxGroup
  defaultValue?: any;
}

export interface LayoutElement extends BaseElement {
  type: 'section' | 'gridRow' | 'gridColumn';
  title?: string;              // For section
  span?: number;               // For gridColumn, 1–24
  children: FormElement[];
}

export interface TextBlockElement extends BaseElement {
  type: 'textBlock';
  content: string;
}

export interface SpacerElement extends BaseElement {
  type: 'spacer';
  height?: number;             // px, default 16
}

export type FormElement =
  | ControlElement
  | LayoutElement
  | TextBlockElement
  | SpacerElement;

export interface FormDefinition {
  id: string;
  name: string;
  description?: string;
  elements: FormElement[];
}
```

---

## 3. UI Layout

### 3.1 Overall App Layout

- Uses Ant Design `Layout` components where helpful.
- Two main columns:
  - Left: ~40% width
  - Right: ~60% width
- Minimal CSS in `src/styles/layout.css` to:
  - Set the split layout
  - Provide background color and spacing
- Desktop-focused layout; responsive behavior is nice-to-have but not critical.

---

## 4. Builder Panel (Left)

Contains three parts:

1. **Palette**
2. **Canvas**
3. **Properties Panel**
4. **JSON Toggle / View** (integrated in the panel header or as tabs)

### 4.1 Palette

- Shows list of available elements:
  - Controls:
    - Text Input
    - Text Area
    - Number
    - Select
    - Radio Group
    - Checkbox
    - Checkbox Group
    - Date
  - Layout:
    - Section
    - Grid Row
    - Grid Column
  - Other:
    - Text Block
    - Spacer
- Each palette item is draggable onto the canvas.

### 4.2 Canvas

- Shows hierarchical tree of elements as per `FormDefinition`.
- Must support:
  - Dropping from palette to root or into layout containers.
  - Reordering within a container.
  - Moving elements between containers.
- Visual cues:
  - Highlighted drop targets.
  - Selected element clearly indicated.

Implementation approach:

- Use a DnD library (e.g. `@hello-pangea/dnd`) or similar.
- Keep the structure simple; no need for pixel-perfect drag previews.

### 4.3 Properties Panel

- Shows properties of the **selected** element.
- Uses Ant Design form controls inside.
- Basic validation:
  - Field `key` should be unique among all controls.
- Editable properties by type:

**All types (where sensible):**

- `label` (controls, sections)
- `visibilityRule` (if present)
- For controls: `key`

**Controls:**

- `required` (checkbox)
- `placeholder`
- `helperText`
- `options` for `select`, `radioGroup`, `checkboxGroup`:
  - Add, remove, edit label/value pairs

**Layout:**

- Section:
  - `title`
- Grid column:
  - `span` (1–24)

**Text Block:**

- `content` (use `Input.TextArea`)

**Spacer:**

- `height` (number input, px)

---

## 5. JSON Code View

- A toggle (tabs or switch) to flip between:
  - **Builder mode** (palette + canvas + properties)
  - **JSON mode** (read-only JSON)
- JSON mode:
  - Uses `JSON.stringify(formDefinition, null, 2)`
  - Rendered in a `<pre>` or Ant Design `Typography.Paragraph` with code styling
  - No editing/parsing required for this POC

---

## 6. Preview Panel (Right)

- Uses Ant Design `Form` as the main container.
- Renders elements recursively:

  - `section`:
    - Optional visual frame (e.g. `Card` or just a title)
    - Children rendered inside
  - `gridRow` / `gridColumn`:
    - Use Ant Design `Row` / `Col` with `span` for columns
  - `textBlock`:
    - Plain text or Ant Typography
  - `spacer`:
    - Empty `div` with `height` style
  - Controls:
    - Map to Ant Design controls:
      - `textInput` → `Input`
      - `textArea` → `Input.TextArea`
      - `number` → `InputNumber`
      - `select` → `Select`
      - `radioGroup` → `Radio.Group`
      - `checkbox` → `Checkbox`
      - `checkboxGroup` → `Checkbox.Group`
      - `date` → `DatePicker`

- Controls are bound to the Ant Design `Form` instance using `name={key}`.
- `helperText` and `required` map to Ant Design `Form.Item` props.

---

## 7. Conditional Logic

- Conditional visibility is based on `VisibilityRule` attached to elements.
- At preview render time:

  - Before rendering an element, evaluate its `visibilityRule` (if present).
  - If rule evaluates to `false`, skip rendering that element (and its subtree).

- Evaluation rules (file: `src/form-schema/conditionalLogic.ts`):

  - For each `VisibilityCondition`:
    - Read `currentValue = formValues[targetFieldKey]`.
    - Apply operator logic:
      - `equals`: `currentValue === value`
      - `notEquals`: `currentValue !== value`
      - `contains`: if `currentValue` is string/array, check containment
      - `greaterThan`: numeric comparison
      - `lessThan`: numeric comparison
  - Combine conditions:
    - If conjunction is `AND`: all must be true.
    - If conjunction is `OR`: at least one must be true.

- Property editor:
  - Simple UI to:
    - Choose `targetFieldKey` from existing control keys.
    - Choose operator.
    - Enter value.
    - Add/remove conditions.
    - Set conjunction.

---

## 8. Docker and docker-compose

### 8.1 Dockerfile

Target: multi-stage build, serve static files via nginx.

- Stage 1 (builder):
  - Base: `node:18-alpine` (or similar)
  - Install dependencies
  - Run `npm run build` (Vite production build)
- Stage 2 (runtime):
  - Base: `nginx:alpine`
  - Copy built assets to `/usr/share/nginx/html`
  - Use default nginx config or minimal custom one

### 8.2 docker-compose.yml

- Service `form-builder-ui`:
  - `build: .`
  - `ports: "8080:80"`
  - Restart policy: `unless-stopped`

The result:

- `docker-compose up --build` should produce a container serving the built app on `http://localhost:8080`.

---

## 9. Non-Goals

- No persistence (no backend, no saving to DB).
- No authentication or multi-user collaboration.
- No AI components in the app itself.
- No comprehensive mobile responsiveness beyond “doesn’t break horribly”.
