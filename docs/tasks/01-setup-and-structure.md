# Task 01 – Setup and Project Structure

## Objective

Create a working baseline React + TypeScript + Vite project using Ant Design, with two-panel layout and Docker/docker-compose support.

## Steps

1. **Initialize project**
   - Use `npm create vite@latest` with the React + TypeScript template.
   - Configure TypeScript strict-ish defaults.

2. **Install dependencies**
   - Ant Design and required peers:
     - `antd`
     - Any required icons package (e.g. `@ant-design/icons`)
   - DnD library (can be done later if desired, but documenting early is fine).

3. **Create basic layout**
   - `src/main.tsx`:
     - Render `App` within `React.StrictMode`.
   - `src/App.tsx`:
     - Use Ant Design `Layout` or a simple flex layout to create:
       - Left panel: placeholder text “Form Builder”
       - Right panel: placeholder text “Form Preview”
   - `src/styles/layout.css`:
     - Basic styling for:
       - Full-height layout
       - Left/right split (~40/60)
       - Padding and background color

4. **Wire styling**
   - Import Ant Design CSS (or recommended style import) in `main.tsx` or `App.tsx`.
   - Import `layout.css`.

5. **Add Dockerfile**
   - Multi-stage build:
     - Node image to build assets via `npm ci` and `npm run build`.
     - Nginx image to serve built assets.

6. **Add docker-compose.yml**
   - Single service `form-builder-ui`:
     - `build: .`
     - `ports: "8080:80"`

7. **Verify**
   - `npm run dev` works locally.
   - `npm run build` succeeds.
   - `docker-compose up --build` serves the built app at `http://localhost:8080`.

## Acceptance Criteria

- Visiting `http://localhost:8080` (or dev server URL) shows a two-panel placeholder layout.
- Project builds successfully via `npm run build`.
- Docker image builds and runs without errors.
