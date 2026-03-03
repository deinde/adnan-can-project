# Directive 005: Backend API Integration

## Goal
Implement a Node.js/Express backend to replace current mock data and handle order persistence.

## Inputs
- `directives/project_blueprint.md`
- `src/App.jsx` (current mock data structure)

## Steps
1. Create a `server/` directory for the backend (or keep it in the root if preferred, but `server/` is cleaner).
2. Initialize `npm init -y` in a `backend/` folder.
3. Install dependencies: `express`, `cors`, `dotenv`.
4. Create `backend/server.js` with endpoints:
   - `GET /api/products`: Return the bulk concentrate listings.
   - `POST /api/orders`: Handle purchase order submissions.
   - `GET /api/inventory`: Return seller-specific inventory data.
   - `GET /api/analytics`: Return market trend data.
5. Update `src/App.jsx` to fetch from the API using `useEffect`.

## Tools/Scripts
- Node.js / Express.
- `nodemon` for development.

## Outputs
- Running Express backend.
- React frontend connected to real data.
