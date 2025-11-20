import { Card, Divider, Tag, Typography } from 'antd';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import type { ElementType } from '../../form-schema/types';

const paletteItems: { type: ElementType; label: string; description: string }[] = [
  { type: 'textInput', label: 'Text Input', description: 'Single-line text field' },
  { type: 'textArea', label: 'Text Area', description: 'Multi-line input' },
  { type: 'number', label: 'Number', description: 'Numeric value' },
  { type: 'select', label: 'Select', description: 'Dropdown of options' },
  { type: 'radioGroup', label: 'Radio Group', description: 'Choose one option' },
  { type: 'checkbox', label: 'Checkbox', description: 'Single checkbox' },
  { type: 'checkboxGroup', label: 'Checkbox Group', description: 'Pick multiple options' },
  { type: 'date', label: 'Date Picker', description: 'Select a date' },
  { type: 'section', label: 'Section', description: 'Group fields together' },
  { type: 'gridRow', label: 'Grid Row', description: 'Horizontal row for columns' },
  { type: 'gridColumn', label: 'Grid Column', description: 'Column within a grid' },
  { type: 'textBlock', label: 'Text Block', description: 'Static descriptive text' },
  { type: 'spacer', label: 'Spacer', description: 'Add vertical spacing' },
];

export function Palette(): JSX.Element {
  return (
    <Card title="Palette" size="small">
      <Droppable droppableId="palette" isDropDisabled>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
              Drag an element into the canvas to add it to the form.
            </Typography.Paragraph>
            {paletteItems.map((item, index) => (
              <Draggable key={item.type} draggableId={`palette-${item.type}`} index={index}>
                {(draggableProvided) => (
                  <Card
                    size="small"
                    bordered
                    className="palette-item"
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <div className="palette-item__header">
                      <Typography.Text strong>{item.label}</Typography.Text>
                      <Tag>{item.type}</Tag>
                    </div>
                    <Typography.Paragraph style={{ marginBottom: 0 }} type="secondary">
                      {item.description}
                    </Typography.Paragraph>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Divider style={{ margin: '12px 0' }} />
      <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
        Sections, rows, and columns can contain other elements.
      </Typography.Paragraph>
    </Card>
  );
}
