import { Card, Empty, Space, Tag, Typography } from 'antd';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import type { FormDefinition, FormElement } from '../../form-schema/types';
import { isLayoutElement } from '../../form-schema/elementUtils';

export interface CanvasProps {
  formDefinition: FormDefinition;
  selectedElementId: string | null;
  onSelectElement: (elementId: string) => void;
}

export function Canvas({ formDefinition, onSelectElement, selectedElementId }: CanvasProps): JSX.Element {
  const hasElements = formDefinition.elements.length > 0;

  return (
    <Card title="Canvas" size="small">
      <Droppable droppableId="root" type="FORM">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`canvas-surface ${snapshot.isDraggingOver ? 'is-active' : ''}`}
          >
            {hasElements ? (
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                {formDefinition.elements.map((element, index) => (
                  <CanvasElement
                    key={element.id}
                    element={element}
                    index={index}
                    onSelectElement={onSelectElement}
                    selectedElementId={selectedElementId}
                  />
                ))}
              </Space>
            ) : (
              <Empty description="Drag items here to start building" />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
}

interface CanvasElementProps {
  element: FormElement;
  index: number;
  selectedElementId: string | null;
  onSelectElement: (elementId: string) => void;
}

function CanvasElement({ element, index, onSelectElement, selectedElementId }: CanvasElementProps): JSX.Element {
  const isSelected = selectedElementId === element.id;
  const isContainer = isLayoutElement(element);

  const content = (
    <div
      className={`canvas-element ${isSelected ? 'is-selected' : ''}`}
      onClick={(event) => {
        event.stopPropagation();
        onSelectElement(element.id);
      }}
    >
      <div className="canvas-element__header">
        <Space size="small" align="center">
          <Tag>{element.type}</Tag>
          <Typography.Text strong>
            {element.label ?? ('title' in element ? element.title : undefined) ?? element.key ?? 'Untitled'}
          </Typography.Text>
        </Space>
        <Typography.Text type="secondary">{isContainer ? 'Container' : 'Control'}</Typography.Text>
      </div>

      {isContainer && (
        <Droppable droppableId={element.id} type="FORM" isCombineEnabled={false}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`canvas-children ${snapshot.isDraggingOver ? 'is-active' : ''}`}
            >
              {element.children.length > 0 ? (
                element.children.map((child, childIndex) => (
                  <CanvasElement
                    key={child.id}
                    element={child}
                    index={childIndex}
                    selectedElementId={selectedElementId}
                    onSelectElement={onSelectElement}
                  />
                ))
              ) : (
                <Empty description="Drop items here" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}

      {!isContainer && element.type === 'textBlock' && (
        <Typography.Paragraph style={{ marginBottom: 0 }} type="secondary">
          {element.content || 'Static text'}
        </Typography.Paragraph>
      )}
      {!isContainer && element.type === 'spacer' && (
        <Typography.Text type="secondary">Spacer height: {element.height ?? 16}px</Typography.Text>
      )}
    </div>
  );

  return (
    <Draggable draggableId={element.id} index={index}>
      {(providedDraggable) => (
        <div
          ref={providedDraggable.innerRef}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
}
