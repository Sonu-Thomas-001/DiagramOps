# DiagramOps - FastAPI & Next.js Starter

This folder contains the exact requested tech stack for local development.

## Tech Stack
- **Backend:** Python (FastAPI)
- **Frontend:** Next.js + TailwindCSS
- **Image Generation:** OpenAI DALL-E 3 (or Stable Diffusion via API)
- **Export:** PNG and PPT (python-pptx or pptxgenjs)

## Folder Structure
```
diagramops-starter/
âââ backend/
â   âââ main.py             # FastAPI application
â   âââ requirements.txt    # Python dependencies
âââ frontend/
    âââ package.json        # Next.js dependencies
    âââ src/app/page.tsx    # Next.js main UI
```

## Running Locally

### Backend (FastAPI)
1. `cd backend`
2. `pip install -r requirements.txt`
3. `uvicorn main:app --reload`

### Frontend (Next.js)
1. `cd frontend`
2. `npm install`
3. `npm run dev`
