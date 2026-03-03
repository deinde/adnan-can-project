# Hosting & Deployment Plan: Z.Flow Marketplace

To host this application for external viewing, we need to transition from a local-only environment to a production-ready cloud deployment.

## 🚀 Recommended Approach: Render.com

Render is chosen for its simplicity in hosting both Static Sites (React frontend) and Web Services (Node.js backend) for free/low-cost.

### 📋 Phase 1: Code Preparation (DONE)
- [x] Replace hardcoded `localhost:5000` with dynamic environment variables (`import.meta.env.VITE_API_URL`).
- [x] Configure `vite.config.js` for production.
- [x] Add `start` script to `backend/package.json`.

### 📋 Phase 2: User Instructions
1. **GitHub Repository**: Link your local code to the repository you created:
   - Repo URL: `https://github.com/deinde/adnan-can-project.git` (Established)
   - To push final tweaks: `git add .`, `git commit -m "prep for render"`, `git push`

2. **Backend Deployment (Render)**:
   - **Create**: New **Web Service**.
   - **Source**: Select your GitHub repo.
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js` (or `npm start`)
   - **Plan**: Free

3. **Frontend Deployment (Render)**:
   - **Create**: New **Static Site**.
   - **Source**: Select your GitHub repo.
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**: 
     - Add `VITE_API_URL` = Your Backend Render URL (e.g., `https://back-end-service.onrender.com`)

---
*Assigned To: Antigravity*
*Status: Ready for User Deployment.*
