# Task 05 – Preview Panel

## Objective

Render the current `FormDefinition` as a live form using Ant Design components.

## Steps

1. **Create Preview panel component**
   - Directory: `src/components/FormPreviewPanel/`
   - Component: `FormPreviewPanel.tsx`
   - Props:
     - `formDefinition: FormDefinition`

2. **Ant Design Form**
   - Wrap controls in `Form` from `antd`.
   - Use `Form.Item` for labels, validation, helper text.

3. **Renderer helper**
   - File: `src/form-schema/renderer.ts`
   - Export a function to recursively render `FormElement`s into React nodes:
     - Section: optional title, children.
     - Grid row/column: use `Row`/`Col` with spans.
     - Text block: plain text or Ant Typography.
     - Spacer: empty `div` with `height` style.
     - Controls: map types to Ant Design components.

4. **Form state**
   - Use `Form.useForm()` inside the preview panel.
   - Ensure default values from `defaultValue` are respected where possible.

## Acceptance Criteria

- Elements in the builder appear in the preview in a logical layout.
- Editing labels, placeholders, required, etc. in the properties panel updates the preview.
- Form is interactable (I can type/select, etc.).
