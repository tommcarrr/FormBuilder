# Task 06 – Conditional Visibility

## Objective

Implement conditional visibility rules and their evaluation.

## Steps

1. **Extend schema**
   - Confirm `VisibilityCondition` and `VisibilityRule` are defined in `types.ts`.
   - Ensure `visibilityRule?: VisibilityRule` is present in `BaseElement`.

2. **Evaluation logic**
   - File: `src/form-schema/conditionalLogic.ts`
   - Export functions:
     - `evaluateCondition(condition, values): boolean`
     - `evaluateVisibilityRule(rule, values): boolean`
   - `values` is an object of `{ [key: string]: any }` from Ant Design Form.

3. **Integrate into preview**
   - Before rendering each element:
     - If `visibilityRule` exists:
       - Evaluate rule against current `Form` values.
       - If false, skip rendering element and its children.
   - Ensure re-render on value changes triggers conditions.

4. **UI for configuration**
   - In `PropertyEditor`, add section for visibility:
     - Allow user to add/remove conditions.
     - For each condition:
       - Select `targetFieldKey` from a dropdown of existing control keys.
       - Select operator.
       - Input value.
     - Select conjunction (AND/OR).
   - Store the result back into `visibilityRule`.

5. **Simple scenario test**
   - Example:
     - Checkbox `showExtra` controls whether a section `ExtraDetails` is visible.
   - Validate behavior end-to-end.

## Acceptance Criteria

- Visibility rules are stored in the schema.
- Preview correctly shows/hides elements based on other values.
- A simple checkbox-driven visibility scenario works as expected.
