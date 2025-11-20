import { useState } from 'react';
import { Layout } from 'antd';
import { FormBuilderPanel } from './components/FormBuilderPanel/FormBuilderPanel';
import { FormPreviewPanel } from './components/FormPreviewPanel/FormPreviewPanel';
import { createDefaultFormDefinition } from './form-schema/defaultSchema';
import type { FormDefinition } from './form-schema/types';

const { Content } = Layout;

export default function App(): JSX.Element {
  const [formDefinition, setFormDefinition] = useState<FormDefinition>(createDefaultFormDefinition);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  return (
    <Layout className="app-layout">
      <Content className="app-content">
        <section className="panel builder-panel" aria-label="Form builder">
          <FormBuilderPanel
            formDefinition={formDefinition}
            selectedElementId={selectedElementId}
            onSelectElement={setSelectedElementId}
            onFormDefinitionChange={setFormDefinition}
          />
        </section>
        <section className="panel preview-panel" aria-label="Form preview">
          <FormPreviewPanel formDefinition={formDefinition} />
        </section>
      </Content>
    </Layout>
  );
}
