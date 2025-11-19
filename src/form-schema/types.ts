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
  value: unknown;
}

export interface VisibilityRule {
  conditions: VisibilityCondition[];
  conjunction: 'AND' | 'OR';
}

export interface BaseElement {
  id: string;
  type: ElementType;
  key?: string;
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
  key: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
  defaultValue?: unknown;
}

export interface LayoutElement extends BaseElement {
  type: 'section' | 'gridRow' | 'gridColumn';
  title?: string;
  span?: number;
  children: FormElement[];
}

export interface TextBlockElement extends BaseElement {
  type: 'textBlock';
  content: string;
}

export interface SpacerElement extends BaseElement {
  type: 'spacer';
  height?: number;
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
