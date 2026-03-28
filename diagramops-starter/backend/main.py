from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import base64
import os
# import openai # Uncomment when using OpenAI

app = FastAPI(title="DiagramOps API", description="Generate architecture diagrams from text")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiagramRequest(BaseModel):
    prompt: str

@app.post("/api/generate")
async def generate_diagram(request: DiagramRequest):
    """
    Generate an architecture diagram using OpenAI DALL-E 3 or Stable Diffusion.
    """
    try:
        # --- Mock implementation ---
        # Replace this with your actual OpenAI or Stable Diffusion call
        
        # client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        # response = client.images.generate(
        #     model="dall-e-3",
        #     prompt=f"A clean, professional software architecture diagram for: {request.prompt}. White background, clear technical symbols, high quality, vector style.",
        #     size="1024x1024",
        #     quality="standard",
        #     n=1,
        # )
        # image_url = response.data[0].url
        
        # For demonstration, returning a placeholder image
        image_url = "https://picsum.photos/seed/diagram/1024/576"
        
        return {
            "status": "success", 
            "image_url": image_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Note: PPTX generation can be handled on the frontend using `pptxgenjs`
# or on the backend using `python-pptx`.
