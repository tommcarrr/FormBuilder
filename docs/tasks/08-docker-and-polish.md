# Task 08 – Docker, Polish and QA

## Objective

Finalize Docker setup, tidy styling, and run a basic QA pass.

## Steps

1. **Finalize Dockerfile**
   - Ensure multi-stage build:
     - Node builder image:
       - Install dependencies using `npm ci` (if lockfile present) or `npm install`.
       - Run `npm run build`.
     - Nginx runtime image:
       - Copy `dist` to `/usr/share/nginx/html`.
       - Use default nginx config or add minimal config file.
   - Expose port 80.

2. **Finalize docker-compose.yml**
   - Service:
     - `form-builder-ui`:
       - `build: .`
       - `ports: ["8080:80"]`
       - `restart: unless-stopped`

3. **Styling polish**
   - `layout.css`:
     - Ensure clean, simple look:
       - Neutral background
       - Reasonable padding and spacing
       - No unnecessary custom styles
   - Check:
       - Scrollbars behave reasonably.
       - Panels are visually distinct but minimal.

4. **QA pass**
   - Verify all user stories in `docs/stories.md`:
     - Basic layout
     - Adding controls
     - Layout/nesting
     - Editing properties
     - Text blocks and spacers
     - JSON view
     - Conditional visibility
     - Docker run
   - Fix any obvious bugs or visual glitches.

## Acceptance Criteria

- `docker-compose up --build` produces a working container that serves the frontend at `http://localhost:8080`.
- UI is clean and modern with no ugly hacks in CSS.
- All stories in `docs/stories.md` are functionally satisfied.
