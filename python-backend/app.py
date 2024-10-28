from fastapi import FastAPI, Request
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
from scoring import grade_summary
from pydantic import BaseModel

class InputData(BaseModel):
    genStr: str

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/api/python-route')
async def get_data():
    return JSONResponse(content={"message": "Python working"})

@app.post('/api/test-scoring')
async def post_data(input_data: InputData):
    reference_summary = "The cat sat on the mat."
    
    scores = grade_summary(reference_summary, input_data.genStr)
    return JSONResponse(content=scores)
    

host = os.getenv("HOST","localhost")

if __name__ == "__main__":
    uvicorn.run(app, host=host, port=8000)