import { Card, Empty, Space, Typography } from 'antd';
import type { FormDefinition, FormElement } from '../../form-schema/types';

export interface FormPreviewPanelProps {
  formDefinition: FormDefinition;
}

export function FormPreviewPanel({ formDefinition }: FormPreviewPanelProps): JSX.Element {
  const hasElements = formDefinition.elements.length > 0;

  return (
    <Card bordered={false} className="panel-card" title="Form Preview">
      {hasElements ? (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {formDefinition.elements.map((element) => (
            <PreviewElement key={element.id} element={element} />
          ))}
        </Space>
      ) : (
        <Empty description="No elements yet" />
      )}
    </Card>
  );
}

function PreviewElement({ element }: { element: FormElement }): JSX.Element {
  if (element.type === 'section' || element.type === 'gridRow' || element.type === 'gridColumn') {
    return (
      <Card
        size="small"
        title={element.type === 'section' ? element.title ?? 'Untitled Section' : element.type}
        style={{ width: '100%' }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {element.children.map((child) => (
            <PreviewElement key={child.id} element={child} />
          ))}
        </Space>
      </Card>
    );
  }

  if (element.type === 'textBlock') {
    return (
      <Typography.Paragraph>
        {element.content || 'Placeholder text block content'}
      </Typography.Paragraph>
    );
  }

  if (element.type === 'spacer') {
    return <div style={{ height: element.height ?? 16 }} />;
  }

  return (
    <div className="preview-control">
      <Typography.Text strong>{element.label ?? element.key ?? 'Untitled Control'}</Typography.Text>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
        {`Control type: ${element.type}`}
      </Typography.Paragraph>
    </div>
  );
}
