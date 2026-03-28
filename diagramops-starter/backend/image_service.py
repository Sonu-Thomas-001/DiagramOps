import os
import base64
from typing import Optional, Dict, Any
import httpx
import openai
from pydantic import BaseModel

class ImageGenerationResponse(BaseModel):
    success: bool
    image_data: Optional[str] = None  # URL or Base64 string
    error: Optional[str] = None

class ImageGeneratorService:
    """
    A service to generate high-resolution images using either OpenAI (DALL-E 3) 
    or Stability AI (Stable Diffusion 3).
    """

    def __init__(self, provider: str = "openai"):
        self.provider = provider.lower()
        
        if self.provider == "openai":
            self.api_key = os.getenv("OPENAI_API_KEY")
            if not self.api_key:
                raise ValueError("OPENAI_API_KEY environment variable is required for OpenAI provider.")
            self.client = openai.OpenAI(api_key=self.api_key)
            
        elif self.provider == "stability":
            self.api_key = os.getenv("STABILITY_API_KEY")
            if not self.api_key:
                raise ValueError("STABILITY_API_KEY environment variable is required for Stability provider.")
            self.stability_api_host = "https://api.stability.ai"
            
        else:
            raise ValueError(f"Unsupported provider: {provider}. Choose 'openai' or 'stability'.")

    async def generate_image(self, prompt: str) -> ImageGenerationResponse:
        """
        Generates an image based on the provided prompt.
        Returns an ImageGenerationResponse containing either the image URL/Base64 or an error.
        """
        if not prompt or not prompt.strip():
            return ImageGenerationResponse(success=False, error="Prompt cannot be empty.")

        try:
            if self.provider == "openai":
                return await self._generate_with_openai(prompt)
            elif self.provider == "stability":
                return await self._generate_with_stability(prompt)
                
        except openai.APIError as e:
            return ImageGenerationResponse(success=False, error=f"OpenAI API Error: {str(e)}")
        except httpx.HTTPError as e:
            return ImageGenerationResponse(success=False, error=f"Network Error: {str(e)}")
        except Exception as e:
            return ImageGenerationResponse(success=False, error=f"Unexpected Error: {str(e)}")

    async def _generate_with_openai(self, prompt: str) -> ImageGenerationResponse:
        """
        Generates a high-resolution image using DALL-E 3.
        Returns the image URL.
        """
        # Note: In a real async FastAPI app, you should use AsyncOpenAI
        # client = openai.AsyncOpenAI(api_key=self.api_key)
        
        response = self.client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024", # High resolution
            quality="hd",     # High definition detail
            n=1,
            response_format="url" # Can also be "b64_json"
        )
        
        image_url = response.data[0].url
        if not image_url:
            raise Exception("OpenAI returned an empty image URL.")
            
        return ImageGenerationResponse(success=True, image_data=image_url)

    async def _generate_with_stability(self, prompt: str) -> ImageGenerationResponse:
        """
        Generates a high-resolution image using Stable Diffusion 3 (Core).
        Returns the image as a Base64 string.
        """
        url = f"{self.stability_api_host}/v2beta/stable-image/generate/core"
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json"
        }
        
        files = {
            "prompt": (None, prompt),
            "output_format": (None, "png"),
            "aspect_ratio": (None, "16:9") # Great for PPT presentations
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, files=files, timeout=60.0)
            
            if response.status_code != 200:
                error_data = response.json()
                raise Exception(f"Stability API Error ({response.status_code}): {error_data}")
                
            data = response.json()
            base64_image = data.get("image")
            
            if not base64_image:
                raise Exception("Stability API did not return image data.")
                
            # Format as a standard data URI so frontends can use it directly in <img src="...">
            data_uri = f"data:image/png;base64,{base64_image}"
            return ImageGenerationResponse(success=True, image_data=data_uri)


# --- Example Usage ---
if __name__ == "__main__":
    import asyncio
    from dotenv import load_dotenv
    
    # Load environment variables (OPENAI_API_KEY, STABILITY_API_KEY)
    load_dotenv()
    
    async def test_generation():
        test_prompt = "A high-quality, professional software architecture diagram. Minimalist flat design, clean vector graphic, monochrome with a single accent color. Lots of whitespace, crisp sans-serif text labels, simple geometric shapes. Pure white background, PPT-ready quality, no clutter."
        
        print("Testing OpenAI DALL-E 3...")
        try:
            # Initialize service (defaults to openai)
            openai_service = ImageGeneratorService(provider="openai")
            result = await openai_service.generate_image(test_prompt)
            
            if result.success:
                print(f"Success! Image URL: {result.image_data}")
            else:
                print(f"Failed: {result.error}")
        except ValueError as e:
            print(f"Skipping OpenAI test: {e}")

        print("\nTesting Stability AI (Stable Diffusion 3)...")
        try:
            # Initialize service for Stability
            stability_service = ImageGeneratorService(provider="stability")
            result = await stability_service.generate_image(test_prompt)
            
            if result.success:
                print(f"Success! Received Base64 Image (Length: {len(result.image_data)})")
                # print(f"Data URI preview: {result.image_data[:50]}...")
            else:
                print(f"Failed: {result.error}")
        except ValueError as e:
            print(f"Skipping Stability test: {e}")

    # Run the async test
    asyncio.run(test_generation())
