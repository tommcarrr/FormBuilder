# Task 07 – JSON Code View

## Objective

Implement the JSON view toggle for the builder panel.

## Steps

1. **Serializer**
   - File: `src/form-schema/serializer.ts`
   - Export function:
     - `serializeFormDefinition(form: FormDefinition): string` – returns pretty JSON.

2. **Toggle UI**
   - Component: `CodeViewToggle` or use tabs in `FormBuilderPanel`.
   - Implement either:
     - Ant Design `Tabs` with “Builder” and “JSON” tabs, or
     - A toggle switch + conditional rendering.

3. **JSON view component**
   - When in JSON mode:
     - Replace palette/canvas/properties with:
       - A code block or `<pre>` rendering the result of `serializeFormDefinition`.
     - Ensure it is read-only.

4. **Sync**
   - On any change in `formDefinition`, JSON view updates automatically.

## Acceptance Criteria

- I can switch between builder and JSON modes via a clear control.
- JSON accurately matches the current form.
- JSON is read-only in the UI.
