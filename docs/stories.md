# User Stories and Acceptance Criteria

The app contains no AI features; it is a standard frontend application.

---

## Story 1 – Basic Layout

**As a** user  
**I want** to see two main panels (builder and preview)  
**So that** I can build a form and see it rendered side by side

### Acceptance Criteria

- Left panel shows:
  - Palette section
  - Canvas section
  - Properties section (even if initially empty)
- Right panel shows a preview placeholder when no elements are defined.
- Layout is split roughly 40% (left) / 60% (right) on desktop.
- No obvious scroll/overflow issues at 1080p.

---

## Story 2 – Add Controls via Palette

**As a** user  
**I want** to drag controls from a palette into a canvas  
**So that** I can build my form visually

### Acceptance Criteria

- Palette lists at least:
  - Text Input, Text Area, Number, Select, Radio Group, Checkbox, Checkbox Group, Date
  - Section, Grid Row, Grid Column
  - Text Block, Spacer
- I can drag a control from the palette and drop it onto the canvas.
- After dropping, the new element appears in the canvas and in the underlying form schema.
- The preview panel updates to show the newly added control in a basic form layout.

---

## Story 3 – Layout Elements and Nesting

**As a** user  
**I want** to add layout containers and nest elements  
**So that** I can create structured forms

### Acceptance Criteria

- I can drag a Section onto the canvas.
- I can drag other elements into the Section.
- I can drag a Grid Row onto the canvas.
- I can drag Grid Columns into a Grid Row.
- I can drag controls into a Grid Column.
- Moving and reordering elements via drag-and-drop updates the preview accordingly.

---

## Story 4 – Editing Properties

**As a** user  
**I want** to select an element and modify its properties  
**So that** I can configure the form fields

### Acceptance Criteria

- When I click an element in the canvas, it becomes “selected”.
- The properties panel shows properties for that element.
- For a text input:
  - I can edit `label`, `key`, `placeholder`, `helperText`, `required`.
- For a select or radio group:
  - I can manage `options` (add/remove/edit label & value).
- Changes to properties are reflected immediately in the preview panel.
- If I assign a duplicate `key` to two controls, I get a clear warning (e.g. inline message).

---

## Story 5 – Text Blocks and Spacers

**As a** user  
**I want** to add text blocks and spacers  
**So that** I can add explanatory text and adjust vertical spacing

### Acceptance Criteria

- I can add a text block and edit its text content in the properties panel.
- The text appears in the preview in a readable style.
- I can add a spacer and set its height in pixels.
- The spacer visually affects vertical spacing in the preview.

---

## Story 6 – JSON View

**As a** user  
**I want** to view the JSON representation of my form  
**So that** I can inspect or export it

### Acceptance Criteria

- There is a clear toggle between “Builder” and “JSON” views for the left panel.
- In JSON view:
  - The builder UI (palette/canvas/properties) is hidden or replaced.
  - I see the full `FormDefinition` serialized as formatted JSON.
  - JSON is read-only.
- The JSON accurately reflects the current structure and properties in the builder and preview.

---

## Story 7 – Conditional Visibility

**As a** user  
**I want** to show or hide a field or section based on another field's value  
**So that** I can build dynamic forms

### Acceptance Criteria

- In the properties panel, I can add one or more conditions to an element’s visibility:
  - Select a `targetFieldKey` from existing control keys.
  - Select an operator (equals, notEquals, contains, greaterThan, lessThan).
  - Enter a comparison value.
- I can choose whether conditions are combined with AND or OR.
- In the preview:
  - When the conditions evaluate to true, the element is visible.
  - When they evaluate to false, the element is hidden.
- At least one simple scenario works end-to-end:
  - Example: A section is only visible when a “Show details” checkbox is checked.

---

## Story 8 – Dockerized Build and Run

**As a** developer  
**I want** to build and run the app via docker-compose  
**So that** I can start the POC without installing node locally

### Acceptance Criteria

- Running `docker-compose up --build`:
  - Builds the app image via Dockerfile.
  - Starts a container serving the built frontend.
- The application is reachable at `http://localhost:8080` (or the documented port).
- The application behaves the same as when run with `npm run dev` (minus dev HMR).
- No errors logged by nginx (or chosen static server) at startup.
