from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from controller import bridgelang

app = FastAPI()

# Enable CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all domains
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all HTTP headers
)

@app.post("/bridgelang")
async def bridge_language(request: Request):
    data = await request.json()
    input_text = data.get("input", "")
    target_language = data.get("target_language", "")  # Extract target language
    return await bridgelang(input_text, target_language)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
