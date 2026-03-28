from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os

# Import our custom modules
from diagram_parser import parse_architecture_description
from diagram_builder import build_diagram_layout
from prompt_builder import generate_image_prompt
from image_service import ImageGeneratorService
from ppt_exporter import create_ppt_from_image

app = FastAPI(title="DiagramOps API", description="Generate architecture diagrams from text")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"], # Allow all for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Request Models ---
class GenerateRequest(BaseModel):
    prompt: str
    style: str = "minimal"

class PPTRequest(BaseModel):
    image_data: str
    title: str = "System Architecture"

# --- Initialize Services ---
# In production, ensure OPENAI_API_KEY or STABILITY_API_KEY is set
# Fallback to a mock if keys are missing to prevent crash on startup
try:
    image_service = ImageGeneratorService(provider="openai")
except ValueError:
    print("WARNING: API keys missing. Image generation will fail if called.")
    image_service = None

# --- Endpoints ---

@app.post("/api/generate")
async def generate_diagram(request: GenerateRequest):
    """
    End-to-end flow: Text -> Parser -> Builder -> Prompt -> Image
    """
    try:
        # 1. Parse Natural Language to Nodes/Edges
        parsed_data = parse_architecture_description(request.prompt)
        
        # 2. Build Layout Hierarchy
        layout_data = build_diagram_layout(parsed_data)
        
        # 3. Generate Optimized Image Prompt
        image_prompt = generate_image_prompt(layout_data, style=request.style)
        
        # 4. Generate Image via AI Model
        if not image_service:
            raise HTTPException(status_code=500, detail="Image service not configured (Missing API Keys).")
            
        image_resp = await image_service.generate_image(image_prompt)
        
        if not image_resp.success:
            raise HTTPException(status_code=500, detail=image_resp.error)
            
        return {
            "status": "success",
            "diagram_data": layout_data,
            "image_prompt": image_prompt,
            "image_url": image_resp.image_data
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/download/ppt")
async def download_ppt(request: PPTRequest):
    """
    Generates a PPTX file from the provided image data.
    Note: Using POST instead of GET because Base64 image strings exceed URL length limits.
    """
    try:
        ppt_stream = await create_ppt_from_image(request.image_data, request.title)
        
        return StreamingResponse(
            ppt_stream,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={"Content-Disposition": f"attachment; filename=architecture_diagram.pptx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

