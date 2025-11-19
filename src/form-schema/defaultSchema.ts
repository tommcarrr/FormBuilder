import { FormDefinition } from './types';

export const defaultFormDefinition: FormDefinition = {
  id: 'form-root',
  name: 'Sample Form',
  description: 'Default form definition with a single text input.',
  elements: [
    {
      id: 'section-1',
      type: 'section',
      title: 'Contact Information',
      children: [
        {
          id: 'text-input-1',
          type: 'textInput',
          key: 'firstName',
          label: 'First Name',
          placeholder: 'Enter first name',
          helperText: 'This is a sample field.',
          required: true,
        },
      ],
    },
  ],
};

export function createDefaultFormDefinition(): FormDefinition {
  return JSON.parse(JSON.stringify(defaultFormDefinition)) as FormDefinition;
}
