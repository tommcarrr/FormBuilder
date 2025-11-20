import type {
  ControlElement,
  ElementType,
  FormDefinition,
  FormElement,
  LayoutElement,
} from './types';

const containerTypes: ElementType[] = ['section', 'gridRow', 'gridColumn'];

export function isLayoutElement(element: FormElement): element is LayoutElement {
  return containerTypes.includes(element.type);
}

export function canAcceptChildren(elementType: ElementType): boolean {
  return containerTypes.includes(elementType);
}

export function collectControlKeys(elements: FormElement[]): Set<string> {
  const keys = new Set<string>();

  elements.forEach((element) => {
    if ('key' in element && element.key) {
      keys.add((element as ControlElement).key);
    }

    if (isLayoutElement(element)) {
      collectControlKeys(element.children).forEach((childKey) => keys.add(childKey));
    }
  });

  return keys;
}

export function generateDefaultKey(elements: FormElement[], base = 'field'): string {
  const existingKeys = collectControlKeys(elements);
  let counter = existingKeys.size + 1;
  let candidate = `${base}${counter}`;

  while (existingKeys.has(candidate)) {
    counter += 1;
    candidate = `${base}${counter}`;
  }

  return candidate;
}

export function createElementFromType(type: ElementType, elements: FormElement[]): FormElement {
  const id = crypto.randomUUID();

  if (type === 'section') {
    return {
      id,
      type,
      title: 'New Section',
      children: [],
    } satisfies LayoutElement;
  }

  if (type === 'gridRow') {
    return { id, type, children: [] } satisfies LayoutElement;
  }

  if (type === 'gridColumn') {
    return { id, type, span: 12, children: [] } satisfies LayoutElement;
  }

  if (type === 'textBlock') {
    return {
      id,
      type,
      content: 'Text block content',
    };
  }

  if (type === 'spacer') {
    return {
      id,
      type,
      height: 16,
    };
  }

  const key = generateDefaultKey(elements);

  return {
    id,
    type,
    key,
    label: 'New Field',
    placeholder: 'Enter a value',
  } satisfies ControlElement;
}

export function getChildren(
  elements: FormElement[],
  containerId: string,
): FormElement[] | null {
  if (containerId === 'root') {
    return elements;
  }

  for (const element of elements) {
    if (isLayoutElement(element)) {
      if (element.id === containerId) {
        return element.children;
      }

      const nested = getChildren(element.children, containerId);
      if (nested) {
        return nested;
      }
    }
  }

  return null;
}

function updateChildren(
  elements: FormElement[],
  containerId: string,
  updater: (children: FormElement[]) => FormElement[],
): FormElement[] {
  if (containerId === 'root') {
    return updater(elements);
  }

  let changed = false;
  const nextElements = elements.map((element) => {
    if (!isLayoutElement(element)) {
      return element;
    }

    if (element.id === containerId) {
      changed = true;
      return { ...element, children: updater(element.children) };
    }

    const updatedChildren = updateChildren(element.children, containerId, updater);
    if (updatedChildren !== element.children) {
      changed = true;
      return { ...element, children: updatedChildren };
    }

    return element;
  });

  return changed ? nextElements : elements;
}

export function insertElement(
  formDefinition: FormDefinition,
  containerId: string,
  index: number,
  element: FormElement,
): FormDefinition {
  const nextElements = updateChildren(formDefinition.elements, containerId, (children) => {
    const updated = [...children];
    updated.splice(index, 0, element);
    return updated;
  });

  return { ...formDefinition, elements: nextElements };
}

export function removeElement(
  formDefinition: FormDefinition,
  containerId: string,
  index: number,
): { definition: FormDefinition; removed?: FormElement } {
  const sourceChildren = getChildren(formDefinition.elements, containerId);

  if (!sourceChildren || index < 0 || index >= sourceChildren.length) {
    return { definition: formDefinition };
  }

  const removed = sourceChildren[index];

  const nextElements = updateChildren(formDefinition.elements, containerId, (children) => {
    const updated = [...children];
    updated.splice(index, 1);
    return updated;
  });

  return { definition: { ...formDefinition, elements: nextElements }, removed };
}

export function moveElement(
  formDefinition: FormDefinition,
  sourceContainerId: string,
  sourceIndex: number,
  destinationContainerId: string,
  destinationIndex: number,
): FormDefinition {
  const removal = removeElement(formDefinition, sourceContainerId, sourceIndex);
  if (!removal.removed) {
    return formDefinition;
  }

  const adjustedDestinationIndex =
    sourceContainerId === destinationContainerId && sourceIndex < destinationIndex
      ? destinationIndex - 1
      : destinationIndex;

  return insertElement(removal.definition, destinationContainerId, adjustedDestinationIndex, removal.removed);
}
