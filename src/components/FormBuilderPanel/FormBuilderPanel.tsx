import { Card, Space, Typography } from 'antd';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Canvas } from './Canvas';
import { Palette } from './Palette';
import {
  createElementFromType,
  getChildren,
  insertElement,
  moveElement,
} from '../../form-schema/elementUtils';
import type { ElementType, FormDefinition } from '../../form-schema/types';

export interface FormBuilderPanelProps {
  formDefinition: FormDefinition;
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  onFormDefinitionChange: (nextDefinition: FormDefinition) => void;
}

export function FormBuilderPanel({
  formDefinition,
  selectedElementId,
  onSelectElement,
  onFormDefinitionChange,
}: FormBuilderPanelProps): JSX.Element {
  const elementCount = formDefinition.elements.length;

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === 'palette') return;

    const destinationChildren = getChildren(formDefinition.elements, destination.droppableId);
    if (!destinationChildren) return;

    if (source.droppableId === 'palette') {
      const type = draggableId.replace('palette-', '') as ElementType;
      const newElement = createElementFromType(type, formDefinition.elements);
      const updated = insertElement(formDefinition, destination.droppableId, destination.index, newElement);
      onFormDefinitionChange(updated);
      onSelectElement(newElement.id);
      return;
    }

    const updated = moveElement(
      formDefinition,
      source.droppableId,
      source.index,
      destination.droppableId,
      destination.index,
    );
    onFormDefinitionChange(updated);
  };

  return (
    <Card bordered={false} className="panel-card" title="Form Builder">
      <Typography.Paragraph>
        Drag items from the palette into the canvas. Current form has {elementCount} top-level
        element{elementCount === 1 ? '' : 's'}.
      </Typography.Paragraph>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Palette />
          <Canvas
            formDefinition={formDefinition}
            onSelectElement={onSelectElement}
            selectedElementId={selectedElementId}
          />
        </Space>
      </DragDropContext>
    </Card>
  );
}
