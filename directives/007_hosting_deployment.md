# Hosting & Deployment Plan: Z.Flow Marketplace

To host this application for external viewing, we need to transition from a local-only environment to a production-ready cloud deployment.

## 🚀 Recommended Approach: Render.com

Render is chosen for its simplicity in hosting both Static Sites (React frontend) and Web Services (Node.js backend) for free/low-cost.

### 📋 Phase 1: Code Preparation (Antigravity's Job)
- [ ] Replace hardcoded `localhost:5000` with dynamic environment variables (`import.meta.env.VITE_API_URL`).
- [ ] Configure `vite.config.js` to handle proxying or absolute URL overrides.
- [ ] Add a top-level `package.json` script if needed, or configure Render to point to subdirectories.

### 📋 Phase 2: User Instructions
1. **GitHub Repository**: Link your local code to the repository you created:
   - Repo URL: `https://github.com/deinde/adnan-can-project.git`
   - Commands to run in your local terminal:
     ```bash
     git remote add origin https://github.com/deinde/adnan-can-project.git
     git branch -M main
     git push -u origin main
     ```
2. **Backend Deployment (Render)**:
   - Create a new **Web Service** on Render.
   - Point it to the `backend/` directory.
   - Set the start command to `node server.js`.
3. **Frontend Deployment (Render)**:
   - Create a new **Static Site** on Render.
   - Build command: `npm run build`.
   - Publish directory: `dist`.
   - Set environment variable `VITE_API_URL` to your Render Backend URL.

## 🛠️ Alternative: Vercel (Frontend Only)
If you prefer Vercel for the frontend, you would still need to host the backend separately (e.g., on Render or Railway).

---
*Assigned To: Antigravity*
*Status: In Progress - Preparing environment variables.*
