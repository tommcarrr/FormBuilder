# Task 03 – Builder UI (Palette + Canvas)

## Objective

Implement the visual form builder panel including palette and canvas, wired to the form schema.

## Steps

1. **Create Builder panel component**
   - Directory: `src/components/FormBuilderPanel/`
   - Main file: `FormBuilderPanel.tsx`
   - Props:
     - `formDefinition: FormDefinition`
     - `onChange(next: FormDefinition): void`
     - `selectedElementId: string | null`
     - `onSelectElement(id: string | null): void`

2. **Implement Palette**
   - Component: `Palette.tsx`
   - Render a list of draggable palette items for each element type.

3. **Implement Canvas**
   - Component: `Canvas.tsx`
   - Render the current tree of `FormElement`s:
     - For layout containers, show children nested visually.
     - For each element, show label/type for identification.
   - Add click handlers to select an element.

4. **Drag & Drop**
   - Add a simple DnD implementation:
     - Drag from palette into:
       - Root container (form)
       - Valid layout containers (section, grid row, grid column)
     - Reordering within a container.
   - On drop:
     - Create new `FormElement` with a generated `id`.
     - For controls, generate a default `key` (e.g. `field1`, `field2`).
     - Update `FormDefinition` via `onChange`.

5. **Visual selection**
   - Highlight currently selected element in the canvas.
   - Clicking the same element again keeps it selected.

## Acceptance Criteria

- I can drag a palette item onto the canvas and see it appear.
- The internal `FormDefinition` updates (inspect via quick logging or soon via JSON view).
- I can select an element by clicking it.
- The preview panel reflects the current structure.
