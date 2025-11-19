# Task 02 – Form Schema Definition

## Objective

Define and wire the form schema types, and set up a basic `FormDefinition` state in the app.

## Steps

1. **Create schema module**
   - File: `src/form-schema/types.ts`
   - Implement types as defined in `docs/spec.md` §2.1.

2. **Create default form**
   - File: `src/form-schema/defaultSchema.ts`
   - Export a simple `FormDefinition` with:
     - One section
     - A single text input inside

3. **Integrate with App state**
   - In `App.tsx`:
     - Use `useState<FormDefinition>` with initial value from `defaultSchema`.
     - Pass `formDefinition` and a setter (e.g. `setFormDefinition`) down to children:
       - `FormBuilderPanel`
       - `FormPreviewPanel`

4. **Ensure type safety**
   - All relevant files imported with proper types.
   - No implicit `any` in core schema handling.

## Acceptance Criteria

- `formDefinition` is typed as `FormDefinition`.
- A simple default form is visible in the preview panel (even if rough).
- No TypeScript errors related to schema types.
