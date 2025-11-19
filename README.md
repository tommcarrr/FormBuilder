# Form Builder POC

This repository defines a proof-of-concept visual form builder frontend.  
The application **does not contain any AI functionality**. The AI is only used as an external agent to write and evolve the code.

The app is:

- Written in **TypeScript**
- Compiled to **JavaScript** for the browser
- Built with **React + Vite**
- Styled with **Ant Design** (plus minimal custom CSS)
- Packaged and runnable via **Docker** and **docker-compose**

## High-Level Features

- **Two-panel layout**
  - **Left panel**: Form Builder
    - Palette of draggable elements:
      - Standard form controls: text input, textarea, number, select, radio group, checkbox, checkbox group, date
      - Layout elements: section, grid row, grid column
      - Content elements: text block, spacer
    - Canvas area to arrange elements, including nesting in layout containers
    - Property editor for the selected element (name/key, label, options, etc.)
    - Conditional visibility rules based on values of other fields
    - Toggle to show underlying JSON representation of the form (read-only)
  - **Right panel**: Live Form Preview
    - Renders the form according to the JSON definition
    - Fully interactable (typing, selecting, etc.)
    - Honors conditional visibility rules

- **Form schema**
  - Single in-memory JSON structure (TypeScript types) as the source of truth

- **Styling**
  - Ant Design components and layout
  - Very small amount of custom CSS to get a clean split layout and spacing

## Tech Stack

- **Language:** TypeScript (compiled to JavaScript)
- **Framework:** React
- **Bundler:** Vite
- **UI library:** Ant Design
- **Containerization:** Docker + docker-compose

## Suggested Directory Structure

```text
.
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   └── MainLayout.tsx
│   │   ├── FormBuilderPanel/
│   │   ├── FormPreviewPanel/
│   │   ├── Palette/
│   │   ├── PropertyEditor/
│   │   └── CodeViewToggle/
│   ├── form-schema/
│   │   ├── types.ts
│   │   ├── defaultSchema.ts
│   │   ├── serializer.ts
│   │   └── conditionalLogic.ts
│   └── styles/
│       └── layout.css
├── docker-compose.yml
├── Dockerfile
└── docs/
    ├── agents.md
    ├── spec.md
    ├── stories.md
    └── tasks/
        ├── 01-setup-and-structure.md
        ├── 02-form-schema.md
        ├── 03-builder-ui.md
        ├── 04-property-editor.md
        ├── 05-preview-panel.md
        ├── 06-conditional-logic.md
        ├── 07-code-view.md
        └── 08-docker-and-polish.md
```

## Running Locally (Once Implemented)

### Without Docker (dev)

```bash
npm install
npm run dev
```

### With Docker & docker-compose

Build and start:

```bash
docker-compose up --build
```

Then open your browser at:

- `http://localhost:8080` (or as defined in `docker-compose.yml`)

## Documentation

- `docs/spec.md` – Detailed functional and technical spec
- `docs/agents.md` – AI agent roles and responsibilities
- `docs/stories.md` – User stories and acceptance criteria
- `docs/tasks/` – Step-by-step implementation tasks for the AI

The AI agent should follow the tasks in order, updating code and docs as needed.
