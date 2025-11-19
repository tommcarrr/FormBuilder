# Task 04 – Property Editor

## Objective

Implement a properties panel that lets users edit the selected element's properties.

## Steps

1. **Create PropertyEditor component**
   - Directory: `src/components/PropertyEditor/`
   - Component: `PropertyEditor.tsx`
   - Props:
     - `formDefinition: FormDefinition`
     - `selectedElementId: string | null`
     - `onChange(next: FormDefinition): void`

2. **Select element**
   - Find the element with `id === selectedElementId` via traversal utility.
   - If none selected, show placeholder text.

3. **Render appropriate fields**
   - Generic fields:
     - `label` (for controls, sections)
     - `key` (for controls)
   - Type-specific fields:
     - Controls: `required`, `placeholder`, `helperText`, `options` where applicable.
     - Section: `title`.
     - Grid column: `span`.
     - Text block: `content`.
     - Spacer: `height`.

4. **Update logic**
   - Create utilities to:
     - Deep clone and update the `FormDefinition`.
     - Update fields immutably by element `id`.
   - Apply updates on change of form fields (e.g. onBlur or onChange).

5. **Key uniqueness**
   - When editing `key`, check for duplicates in all control elements.
   - If duplicate exists:
     - Show inline warning.
     - Optionally block applying the change or allow with warning.

## Acceptance Criteria

- Selecting an element shows its properties in the panel.
- Editing properties updates both:
  - The canvas representation.
  - The preview panel.
- Duplicate keys are warned about.
