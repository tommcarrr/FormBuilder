import { Card, Typography } from 'antd';
import type { FormDefinition } from '../../form-schema/types';

export interface FormBuilderPanelProps {
  formDefinition: FormDefinition;
  onFormDefinitionChange: (nextDefinition: FormDefinition) => void;
}

export function FormBuilderPanel({ formDefinition }: FormBuilderPanelProps): JSX.Element {
  const elementCount = formDefinition.elements.length;

  return (
    <Card bordered={false} className="panel-card" title="Form Builder">
      <Typography.Paragraph>
        Builder tools will appear here. Current form has {elementCount} top-level
        element{elementCount === 1 ? '' : 's'}.
      </Typography.Paragraph>
    </Card>
  );
}
