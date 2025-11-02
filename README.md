
# Harish Cartoon Maker — Full Stack (Frontend + Render server)

This package contains a ready-to-deploy frontend (Vite + React) and a Render-ready Express server.

## Quick steps

### 1) Deploy server to Render
- Go to https://dashboard.render.com
- New → Web Service → Choose the `server` folder from this project
- Build Command: `npm install && npm start`
- Start Command: `node index.js`
- Add environment variable: `REPLICATE_API_TOKEN` (your token)
- Deploy. After deploy, copy the server URL (e.g. https://<your-service>.onrender.com)

### 2) Deploy frontend to Netlify (upload the `frontend` folder as a ZIP)
- Go to https://app.netlify.com/drop and drag the `frontend` folder (zipped)
- Or create a site and point to the `frontend` folder
- Add environment variable in Netlify: `VITE_BACKEND_URL` = https://<your-server>.onrender.com
- Deploy

## Notes
- The frontend expects the backend at ${VITE_BACKEND_URL}/api/convert
- The server uses two default model slugs (you can override via environment variables):
  - REPLICATE_MODEL_CARTOONIFY (default: catacolabs/cartoonify)
  - REPLICATE_MODEL_SKETCH (default: crivera/sketch-lora)

